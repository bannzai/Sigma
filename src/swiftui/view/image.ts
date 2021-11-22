import { SwiftUIContext } from "../context";

export function walkForImage(
  context: SwiftUIContext,
  node: MinimalFillsMixin & BaseStyle
) {
  const { name, fills } = node;
  if (fills !== figma.mixed) {
    for (const fill of fills) {
      if (fill.type === "IMAGE") {
        if (fill.imageHash != null) {
          context.add(`Image("${name}")`);
        }
      }
    }
  }
}
