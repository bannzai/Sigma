import * as assert from "assert";
import { SwiftUIContext } from "../context";

export function walkToFrameNodeForFrameModifier(
  context: SwiftUIContext,
  node: BaseFrameMixin & BaseNode
) {
  const {
    name,
    width,
    height,
    layoutMode,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    // Decide to self(frame node) sizing mode
    primaryAxisSizingMode,
    counterAxisSizingMode,
    // Dependant to parent properties
    layoutAlign,
    layoutGrow,
  } = node;

  console.log(
    JSON.stringify({
      name,
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

  interface FixedWidth {
    label: "width";
    width: number;
  }
  interface MaxWidth {
    label: "maxWidth";
    width: ".infinity";
  }
  interface FixedHeight {
    label: "height";
    height: number;
  }
  interface MaxHeight {
    label: "maxHeight";
    height: ".infinity";
  }

  /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
  assert(layoutAlign !== "MIN");
  assert(layoutAlign !== "MAX");
  assert(layoutAlign !== "CENTER");

  var fixedWidth: FixedWidth | null = null;
  var maxWidth: MaxWidth | null = null;
  var fixedHeight: FixedHeight | null = null;
  var maxHeight: MaxHeight | null = null;
  var alignment:
    | "leading"
    | "top"
    | "trailing"
    | "bottom"
    | "topLeading"
    | "topTrailing"
    | "bottomLeading"
    | "bottomTrailing"
    | "center" = "center";

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
      const parentLayoutMode = context.secondLatestFromNode?.node.layoutMode;
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
      const parentLayoutMode = context.secondLatestFromNode?.node.layoutMode;
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
      const parentLayoutMode = context.secondLatestFromNode?.node.layoutMode;
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
      const parentLayoutMode = context.secondLatestFromNode?.node.layoutMode;
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

  // Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
  // IMPORTANT: Determines if the layer should stretch along the parent’s counter axis.
  if (layoutAlign === "STRETCH") {
    const parent = context.secondLatestFromNode?.node;
    assert(parent != null);
    const { layoutMode: parentLayoutMode } = parent;

    if (parentLayoutMode === "VERTICAL") {
      maxWidth = { label: "maxWidth", width: ".infinity" };
    } else if (parentLayoutMode === "HORIZONTAL") {
      maxHeight = { label: "maxHeight", height: ".infinity" };
    } else {
      assert(false, "it is not decide stretch axis when parent without axis");
    }
  }

  // Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutgrow/
  // IMPORTANT: Determines whether a layer should stretch along the parent’s primary axis
  if (layoutGrow === 1) {
    const parent = context.secondLatestFromNode?.node;
    assert(parent != null);
    const { layoutMode: parentLayoutMode } = parent;

    if (parentLayoutMode === "VERTICAL") {
      maxHeight = { label: "maxHeight", height: ".infinity" };
    } else if (parentLayoutMode === "HORIZONTAL") {
      maxWidth = { label: "maxWidth", width: ".infinity" };
    } else {
      assert(false, "it is not decide stretch axis when parent without axis");
    }
  }

  var maximumFrameArgs: string[] = [];
  if (maxWidth != null) {
    maximumFrameArgs.push(`maxWidth: ${maxWidth.width}`);
  }
  if (maxHeight != null) {
    maximumFrameArgs.push(`maxHeight: ${maxHeight.height}`);
  }
  if (maximumFrameArgs.length > 0) {
    if (alignment !== "center") {
      maximumFrameArgs.push(`alignment: .${alignment}`);
    }

    const args = maximumFrameArgs.join(", ");
    context.add(`.frame(${args})\n`);
  }

  var fixedFrameArgs: string[] = [];
  if (fixedWidth != null) {
    fixedFrameArgs.push(`width: ${fixedWidth.width}`);
  }
  if (fixedHeight != null) {
    fixedFrameArgs.push(`height: ${fixedHeight.height}`);
  }
  if (fixedFrameArgs.length > 0) {
    if (alignment !== "center") {
      maximumFrameArgs.push(`alignment: .${alignment}`);
    }

    const args = fixedFrameArgs.join(", ");
    context.add(`.frame(${args})\n`);
  }

  context.lineBreak();
}

export function walkForGropuFrame(
  context: SwiftUIContext,
  node: LayoutMixin & BaseNode
) {
  const { width, height, layoutAlign, layoutGrow } = node;

  /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
  assert(layoutAlign !== "MIN");
  assert(layoutAlign !== "MAX");
  assert(layoutAlign !== "CENTER");

  var layoutMode: "VERTICAL" | "HORIZONTAL" | null = null;
  var parent = node.parent;
  while (layoutMode == null && parent != null) {
    if (parent.type === "FRAME") {
      if (parent.layoutMode !== "NONE") {
        layoutMode = parent.layoutMode;
      }
    }

    parent = parent.parent;
  }

  if (layoutMode == null) {
    return;
  }

  const isFixedMainAxis = layoutGrow === 0;
  const isStretchMainAxis = layoutGrow === 1;

  context.lineBreak();
  if (layoutMode === "VERTICAL") {
    if (layoutAlign === "STRETCH") {
      context.add(".frame(maxWidth: .infinity)\n");
    } else {
      const _: "INHERIT" = layoutAlign;
    }

    if (isFixedMainAxis) {
      context.add(`.frame(height: ${height})\n`);
    } else if (isStretchMainAxis) {
      context.add(`.frame(maxHeight: .infinity)\n`);
    }
  } else {
    if (layoutAlign === "STRETCH") {
      context.add(".frame(maxHeight: .infinity)\n");
    } else {
      const _: "INHERIT" = layoutAlign;
    }

    if (isFixedMainAxis) {
      context.add(`.frame(width: ${height})\n`);
    } else if (isStretchMainAxis) {
      context.add(`.frame(maxWidth: .infinity)\n`);
    }
  }
}

export function walkForFixedFrame(
  context: SwiftUIContext,
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
  assert(layoutAlign !== "MIN");
  assert(layoutAlign !== "MAX");
  assert(layoutAlign !== "CENTER");

  if (layoutAlign === "INHERIT") {
    context.lineBreak();
    context.nest();
    context.add(`.frame(width: ${width}, height: ${height})`);
    context.unnest();
  } else if (layoutAlign === "STRETCH") {
    assert(false, "unknown pattern");
  } else {
    const _: never = layoutAlign;
  }
}
