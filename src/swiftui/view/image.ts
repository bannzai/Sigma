import { FigmaContext } from "../context";
import { ImageModifier } from "../types/imageModifier";
import { Image } from "../types/views";

export type ImageNode = MinimalFillsMixin & SceneNode & LayoutMixin;

export function walkForImage(
  context: FigmaContext,
  fill: ImagePaint,
  node: ImageNode
) {
  const { name } = node;

  let modifiers: ImageModifier[] = [];
  if (fill.scaleMode === "FIT") {
    modifiers.push({ type: "resizable" });
  }

  const image: Image = {
    type: "Image",
    name,
    modifiers,
    parent: context.container,
    node: node,
  };
  context.addChild(image);
}
