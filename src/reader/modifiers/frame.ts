const assert = require("assert");
import { FigmaContext } from "../context";
import { FrameModifier } from "../../types/modifiers";
import {
  Alignment,
  FixedHeight,
  FixedWidth,
  MaxHeight,
  MaxWidth,
} from "../../types/frameModifierTypes";
import { View } from "../../types/views";
import { trace } from "../../util/tracer";

export function appendFrameModifierWithFrameNode(
  context: FigmaContext,
  view: View,
  node: LayoutMixin & SceneNode
) {
  trace("adaptFrameModifierWithFrameNode", context, node);

  let parentFrameNode: FrameNode | null;
  if (node.parent?.type === "FRAME") {
    parentFrameNode = node.parent;
  } else {
    parentFrameNode = null;
  }

  var fixedWidth: FixedWidth | null = null;
  var maxWidth: MaxWidth | null = null;
  var fixedHeight: FixedHeight | null = null;
  var maxHeight: MaxHeight | null = null;
  var alignment: Alignment = "center";

  const {
    name,
    type,
    width,
    height,
    // Dependant to parent properties
    layoutAlign,
    layoutGrow,
  } = node;

  if (node.type === "FRAME") {
    const {
      layoutMode,
      primaryAxisAlignItems,
      counterAxisAlignItems,
      // Decide to self(frame node) sizing mode
      primaryAxisSizingMode,
      counterAxisSizingMode,
    } = node;

    console.log(
      JSON.stringify({
        name,
        type,
        width,
        height,
        primaryAxisSizingMode,
        counterAxisSizingMode,
        primaryAxisAlignItems,
        counterAxisAlignItems,
        layoutAlign,
        layoutGrow,
        layoutMode,
      })
    );

    /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
    if (
      layoutAlign === "MIN" ||
      layoutAlign === "MAX" ||
      layoutAlign === "CENTER"
    ) {
      return;
    }

    if (layoutMode === "VERTICAL") {
      if (primaryAxisAlignItems === "MIN") {
        if (counterAxisAlignItems === "MIN") {
          alignment = "topLeading";
        } else if (counterAxisAlignItems === "MAX") {
          alignment = "topTrailing";
        } else {
          alignment = "top";
        }
      } else if (primaryAxisAlignItems === "MAX") {
        if (counterAxisAlignItems === "MIN") {
          alignment = "bottomLeading";
        } else if (counterAxisAlignItems === "MAX") {
          alignment = "bottomTrailing";
        } else {
          alignment = "bottom";
        }
      }
    } else {
      if (primaryAxisAlignItems === "MIN") {
        if (counterAxisAlignItems === "MIN") {
          alignment = "topLeading";
        } else if (counterAxisAlignItems === "MAX") {
          alignment = "bottomLeading";
        } else {
          alignment = "leading";
        }
      } else if (primaryAxisAlignItems === "MAX") {
        if (counterAxisAlignItems === "MIN") {
          alignment = "topTrailing";
        } else if (counterAxisAlignItems === "MAX") {
          alignment = "bottomTrailing";
        } else {
          alignment = "trailing";
        }
      }
    }

    if (layoutMode === "VERTICAL") {
      // NOTE: "FIXED": The primary axis length is determined by the user or plugins, unless the layoutAlign is set to “STRETCH” or layoutGrow is 1.
      // https://www.figma.com/plugin-docs/api/properties/nodes-primaryaxissizingmode/
      if (primaryAxisSizingMode === "FIXED") {
        const parentLayoutMode = parentFrameNode?.layoutMode;
        if (parentLayoutMode == null) {
          fixedHeight = { label: "height", height };
        } else {
          if (parentLayoutMode === "VERTICAL") {
            if (layoutGrow === 0) {
              fixedHeight = { label: "height", height };
            }
          } else if (parentLayoutMode === "HORIZONTAL") {
            if (layoutAlign !== "STRETCH") {
              fixedHeight = { label: "height", height };
            }
          }
        }
      }
      // NOTE: "FIXED": The counter axis length is determined by the user or plugins, unless the layoutAlign is set to “STRETCH” or layoutGrow is 1.
      // https://www.figma.com/plugin-docs/api/properties/nodes-counteraxissizingmode/
      if (counterAxisSizingMode === "FIXED") {
        const parentLayoutMode = parentFrameNode?.layoutMode;
        if (parentLayoutMode == null) {
          fixedWidth = { label: "width", width };
        } else {
          if (parentLayoutMode === "VERTICAL") {
            if (layoutAlign !== "STRETCH") {
              fixedWidth = { label: "width", width };
            }
          } else if (parentLayoutMode === "HORIZONTAL") {
            if (layoutGrow === 0) {
              fixedWidth = { label: "width", width };
            }
          }
        }
      }
    } else if (layoutMode === "HORIZONTAL") {
      if (primaryAxisSizingMode === "FIXED") {
        const parentLayoutMode = parentFrameNode?.layoutMode;
        if (parentLayoutMode == null) {
          fixedWidth = { label: "width", width };
        } else {
          if (parentLayoutMode === "VERTICAL") {
            if (layoutAlign !== "STRETCH") {
              fixedWidth = { label: "width", width };
            }
          } else if (parentLayoutMode === "HORIZONTAL") {
            if (layoutGrow === 0) {
              fixedWidth = { label: "width", width };
            }
          }
        }
      }

      if (counterAxisSizingMode === "FIXED") {
        const parentLayoutMode = parentFrameNode?.layoutMode;
        if (parentLayoutMode == null) {
          fixedHeight = { label: "height", height };
        } else {
          if (parentLayoutMode === "VERTICAL") {
            if (layoutGrow === 0) {
              fixedHeight = { label: "height", height };
            }
          } else if (parentLayoutMode === "HORIZONTAL") {
            if (layoutAlign !== "STRETCH") {
              fixedHeight = { label: "height", height };
            }
          }
        }
      }
    }
  } else {
    console.log(
      JSON.stringify({
        name,
        type,
        width,
        height,
        layoutAlign,
        layoutGrow,
      })
    );
  }

  // Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
  // IMPORTANT: Determines if the layer should stretch along the parent’s counter axis.
  if (layoutAlign === "STRETCH") {
    const parent = parentFrameNode;
    if (parent != null) {
      const { layoutMode: parentLayoutMode } = parent;

      if (parentLayoutMode === "VERTICAL") {
        maxWidth = { label: "maxWidth", width: "infinity" };
      } else if (parentLayoutMode === "HORIZONTAL") {
        maxHeight = { label: "maxHeight", height: "infinity" };
      } else {
        assert(false, "it is not decide stretch axis when parent without axis");
      }
    }
  }

  // Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutgrow/
  // IMPORTANT: Determines whether a layer should stretch along the parent’s primary axis
  if (layoutGrow === 1) {
    const parent = parentFrameNode;
    if (parent != null) {
      const { layoutMode: parentLayoutMode } = parent;

      if (parentLayoutMode === "VERTICAL") {
        maxHeight = { label: "maxHeight", height: "infinity" };
      } else if (parentLayoutMode === "HORIZONTAL") {
        maxWidth = { label: "maxWidth", width: "infinity" };
      } else {
        assert(false, "it is not decide stretch axis when parent without axis");
      }
    }
  }

  const frameModifier: FrameModifier = {
    type: "frame",
    alignment: "center",
  };
  if (maxWidth != null) {
    frameModifier.maxWidth = maxWidth.width;
  }
  if (maxHeight != null) {
    frameModifier.maxHeight = maxHeight.height;
  }

  if (fixedWidth != null) {
    frameModifier.width = fixedWidth.width;
  }
  if (fixedHeight != null) {
    frameModifier.height = fixedHeight.height;
  }
  frameModifier.alignment = alignment;

  view.modifiers.push(frameModifier);
}

export function appendFixedFrame(
  context: FigmaContext,
  view: View,
  node: LayoutMixin & BaseNode
) {
  const { name, width, height, layoutAlign } = node;
  console.log(JSON.stringify({ name, width, height, layoutAlign }));

  /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment.
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
  if (
    layoutAlign === "MIN" ||
    layoutAlign === "MAX" ||
    layoutAlign === "CENTER"
  ) {
    return;
  }

  if (layoutAlign === "INHERIT") {
    const modifier: FrameModifier = {
      type: "frame",
      width,
      height,
      alignment: "center",
    };
    view.modifiers.push(modifier);
  } else if (layoutAlign === "STRETCH") {
    assert(false, "unknown pattern");
  } else {
    const _: never = layoutAlign;
  }
}
