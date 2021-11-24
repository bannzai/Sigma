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
    primaryAxisSizingMode,
    counterAxisSizingMode,
    counterAxisAlignItems,
    layoutAlign,
    layoutMode,
    layoutGrow,
  } = node;

  console.log(
    JSON.stringify({
      name,
      width,
      height,
      primaryAxisSizingMode,
      counterAxisSizingMode,
      layoutAlign,
      layoutMode,
      layoutGrow,
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
    var fixedWidth: FixedWidth | null = null;
    var maxWidth: MaxWidth | null = null;
    var fixedHeight: FixedHeight | null = null;
    var maxHeight: MaxHeight | null = null;
    var alignment: "leading" | "top" | "trailing" | "bottom" | null = null;

    if (layoutMode === "VERTICAL") {
      if (counterAxisAlignItems === "MIN") {
        alignment = "leading";
      } else if (counterAxisAlignItems === "MAX") {
        alignment = "trailing";
      }
    } else {
      if (counterAxisAlignItems === "MIN") {
        alignment = "top";
      } else if (counterAxisAlignItems === "MAX") {
        alignment = "bottom";
      }
    }

    if (layoutAlign === "INHERIT") {
      if (layoutMode === "VERTICAL") {
        const isFixedHeight = primaryAxisSizingMode === "FIXED";
        const isFixedWidth = counterAxisSizingMode === "FIXED";
        if (isFixedWidth && isFixedHeight) {
          fixedWidth = { label: "width", width };
          fixedHeight = { label: "height", height };
        } else {
          if (isFixedWidth) {
            fixedWidth = { label: "width", width };
          } else if (isFixedHeight) {
            fixedHeight = { label: "height", height };
          }
        }
      } else {
        const isFixedWidth = primaryAxisSizingMode === "FIXED";
        const isFixedHeight = counterAxisSizingMode === "FIXED";
        if (isFixedWidth && isFixedHeight) {
          fixedWidth = { label: "width", width };
          fixedHeight = { label: "height", height };
        } else {
          if (isFixedWidth) {
            fixedWidth = { label: "width", width };
          } else if (isFixedHeight) {
            fixedHeight = { label: "height", height };
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

        // NOTE: undocument behavior
        if (layoutGrow === 0) {
          maxWidth = { label: "maxWidth", width: ".infinity" };
          fixedHeight = { label: "height", height };
        } else {
          maxWidth = { label: "maxWidth", width: ".infinity" };
          maxHeight = { label: "maxHeight", height: ".infinity" };
        }
      } else {
        /*
NOTE: If the current node is an auto layout frame (e.g. an auto layout frame inside a parent auto layout frame) 
if you set layoutAlign to “STRETCH” you should set the corresponding axis – either primaryAxisSizingMode or counterAxisSizingMode 
– to be“FIXED”. This is because an auto-layout frame cannot simultaneously stretch to fill its parent and shrink to hug its children.

Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/

So, (primary|counter)AxisSizingMode === FIXED means the corresponding one is STRETCH
        */
        if (layoutMode === "VERTICAL") {
          const isVerticalAxisStretch = primaryAxisSizingMode === "FIXED";
          const isHorizontalAxisStretch = counterAxisSizingMode === "FIXED";
          if (isVerticalAxisStretch) {
            maxHeight = { label: "maxHeight", height: ".infinity" };
          } else if (isHorizontalAxisStretch) {
            maxWidth = { label: "maxWidth", width: ".infinity" };
          } else if (isVerticalAxisStretch && isHorizontalAxisStretch) {
            assert(false, "unknown pattern");
          }
        } else if (layoutMode === "HORIZONTAL") {
          const isHorizontalAxisStretch = primaryAxisSizingMode === "FIXED";
          const isVerticalAxisStretch = counterAxisSizingMode === "FIXED";
          if (isHorizontalAxisStretch) {
            maxWidth = { label: "maxWidth", width: ".infinity" };
          } else if (isVerticalAxisStretch) {
            maxHeight = { label: "maxHeight", height: ".infinity" };
          } else if (isVerticalAxisStretch && isHorizontalAxisStretch) {
            assert(false, "unknown pattern");
          }
        }
      }
    } else {
      const _: never = layoutAlign;
    }

    var maximumFrameArgs: string[] = [];
    if (maxWidth != null) {
      maximumFrameArgs.push(`maxWidth: ${maxWidth.width}`);
    }
    if (maxHeight != null) {
      maximumFrameArgs.push(`maxHeight: ${maxHeight.height}`);
    }
    if (maximumFrameArgs.length > 0) {
      if (alignment != null) {
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
      if (alignment != null) {
        maximumFrameArgs.push(`alignment: .${alignment}`);
      }

      const args = fixedFrameArgs.join(", ");
      context.add(`.frame(${args})\n`);
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
