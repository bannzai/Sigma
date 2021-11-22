import { SwiftUIContext } from "../context";

export function walkForFrame(
  context: SwiftUIContext,
  node: BaseFrameMixin & BaseNode
) {
  const {
    name,
    width,
    height,
    absoluteRenderBounds,
    primaryAxisSizingMode,
    counterAxisSizingMode,
    layoutAlign,
    layoutMode,
  } = node;
  console.log(
    JSON.stringify({
      name,
      width,
      height,
      absoluteRenderBounds,
      layoutAlign,
      primaryAxisSizingMode,
      counterAxisSizingMode,
    })
  );

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
  } else if (layoutAlign === "INHERIT") {
    return;
  } else if (layoutAlign === "STRETCH") {
    if (layoutMode === "VERTICAL") {
      context.add(`.frame(maxWidth: .infinity)`);
    } else if (layoutMode === "HORIZONTAL") {
      context.add(`.frame(maxHeight: .infinity)`);
    }
  } else {
    const _: never = layoutAlign;
  }
}
