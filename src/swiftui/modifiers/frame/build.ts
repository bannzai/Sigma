import { SwiftUIContext } from "../../context";
import { nonNullable } from "../../util/foundation";
import {
  Alignment,
  FixedHeight,
  FixedWidth,
  FrameModifierArgument,
  MaxHeight,
  MaxWidth,
} from "./types";

export function build(
  context: SwiftUIContext,
  node: FrameNode
): FrameModifierArgument {
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

  var fixedWidth: FixedWidth | null = null;
  var maxWidth: MaxWidth | null = null;
  var fixedHeight: FixedHeight | null = null;
  var maxHeight: MaxHeight | null = null;
  var alignment: Alignment = "center";

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

  return {
    fixedWidth,
    maxWidth,
    fixedHeight,
    maxHeight,
    alignment,
  };
}
