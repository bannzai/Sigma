import { SwiftUIContext } from "./context";

export type ImageNode = MinimalFillsMixin & BaseNode;

export function walkForImage(context: SwiftUIContext, node: ImageNode) {
  const { name, fills } = node;
  if (fills !== figma.mixed) {
    for (const fill of fills) {
      if (fill.type === "IMAGE") {
        context.add(`Image("${name}")`);
      }
    }
  }
}
