import { SwiftUIContext } from "../context";

export type ImageNode = MinimalFillsMixin & BaseNode & LayoutMixin;

export function walkForImage(
  context: SwiftUIContext,
  fill: ImagePaint,
  node: ImageNode
) {
  const { name } = node;

  context.lineBreak();
  context.add(`Image("${name}")\n`);

  context.nest();

  if (fill.scaleMode === "FIT") {
    context.lineBreak();
    context.add(".resizable()\n");
  }

  context.unnest();
}
