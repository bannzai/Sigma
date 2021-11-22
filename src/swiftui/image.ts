import { SwiftUIContext } from "./context";

export type ImageNode = MinimalFillsMixin & BaseNode;

export function walkForImage(context: SwiftUIContext, node: ImageNode) {
  const { name, fills } = node;
  if (fills !== figma.mixed) {
    for (const fill of fills) {
      if (fill.type === "IMAGE") {
        context.lineBreak();
        context.add(`Image("${name}")\n`);
        walkForImageModifier(context, fill);
      }
    }
  }
}

export function walkForImageModifier(
  context: SwiftUIContext,
  image: ImagePaint
) {
  context.nest();

  if (image.scaleMode === "FIT") {
    context.lineBreak();
    context.add(".resizable()\n");
  }

  context.unnest();
}
