import * as assert from "assert";
import { SwiftUIContext } from "../context";

export function walkForFrame(
  context: SwiftUIContext,
  node: BaseFrameMixin & BaseNode
) {
  const {
    width,
    height,
    primaryAxisSizingMode,
    counterAxisSizingMode,
    layoutAlign,
    layoutMode,
  } = node;

  if (
    layoutAlign === "MIN" ||
    layoutAlign === "MAX" ||
    layoutAlign === "CENTER"
  ) {
    /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
    return;
  } else {
    if (layoutAlign === "INHERIT") {
      if (layoutMode === "VERTICAL") {
        const isFixedHeight = primaryAxisSizingMode === "FIXED";
        const isFixedWidth = counterAxisSizingMode === "FIXED";
        if (isFixedWidth && isFixedHeight) {
          context.add(`.frame(width: ${width}, height: ${height})`);
        } else {
          if (isFixedWidth) {
            context.add(`.frame(width: ${width})`);
          } else if (isFixedHeight) {
            context.add(`.frame(height: ${height})`);
          }
        }
      } else {
        const isFixedWidth = primaryAxisSizingMode === "FIXED";
        const isFixedHeight = counterAxisSizingMode === "FIXED";
        if (isFixedWidth && isFixedHeight) {
          context.add(`.frame(width: ${width}, height: ${height})`);
        } else {
          if (isFixedWidth) {
            context.add(`.frame(width: ${width})`);
          } else if (isFixedHeight) {
            context.add(`.frame(height: ${height})`);
          }
        }
      }
    } else if (layoutAlign === "STRETCH") {
      if (
        primaryAxisSizingMode === "FIXED" &&
        counterAxisSizingMode === "FIXED"
      ) {
        /*
           NOTE: If the current node is an auto layout frame (e.g. an auto layout frame inside a parent auto layout frame) 
           if you set layoutAlign to “STRETCH” you should set the corresponding axis – either primaryAxisSizingMode or counterAxisSizingMode – 
           to be “FIXED”. This is because an auto-layout frame cannot simultaneously stretch to fill its parent and shrink to hug its children.

            Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
           */
        context.add(`.frame(maxWidth: .infinity, maxHeight: .infinity)`);
      } else if (layoutMode === "VERTICAL") {
        const isFixedHeight = primaryAxisSizingMode === "FIXED";
        if (isFixedHeight) {
          context.add(`.frame(maxWidth: .infinity, maxHeight: ${height})`);
        } else {
          context.add(`.frame(maxWidth: .infinity)`);
        }
      } else if (layoutMode === "HORIZONTAL") {
        const isFixedWidth = primaryAxisSizingMode === "FIXED";
        if (isFixedWidth) {
          context.add(`.frame(maxWidth: ${width}, maxHeight: .infinity)`);
        } else {
          context.add(`.frame(maxHeight: .infinity)`);
        }
      }
    } else {
      const _: never = layoutAlign;
    }
  }

  context.lineBreak();
}

export function walkForGropuFrame(
  context: SwiftUIContext,
  node: LayoutMixin & BaseNode
) {
  const { width, height, layoutAlign, layoutGrow } = node;

  if (
    layoutAlign === "MIN" ||
    layoutAlign === "MAX" ||
    layoutAlign === "CENTER"
  ) {
    /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
    return;
  } else {
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
}

export function walkForFixedFrame(
  context: SwiftUIContext,
  node: LayoutMixin & BaseNode
) {
  const { name, width, height, layoutAlign } = node;
  console.log(JSON.stringify({ name, width, height, layoutAlign }));

  if (
    layoutAlign === "MIN" ||
    layoutAlign === "MAX" ||
    layoutAlign === "CENTER"
  ) {
    /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
    return;
  } else {
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
}
