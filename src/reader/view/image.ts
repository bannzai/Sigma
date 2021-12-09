import { FigmaContext } from "../context";
import { ImageModifier } from "../../types/imageModifier";
import { Image } from "../../types/views";
import { walkForForegroundColor } from "../modifiers/foregroundColor";
import { appendFixedFrame } from "../modifiers/frame";

export type ImageNode = DefaultShapeMixin & SceneNode;

export function walkForImage(
  context: FigmaContext,
  fill: ImagePaint,
  node: ImageNode
) {
  const { name } = node;

  let image: Image;
  if (name.startsWith("SFSymbols#")) {
    const systemName = name.slice("SFSymbols#".length);
    image = {
      type: "Image",
      systemName,
      modifiers: [],
      parent: context.container,
      node: node,
    };
    context.addChild(image);
  } else {
    image = {
      type: "Image",
      name,
      modifiers: [],
      parent: context.container,
      node: node,
    };
    context.addChild(image);
  }

  if (fill.scaleMode === "FIT") {
    image.modifiers.push({ type: "resizable" });
    appendFixedFrame(context, context.findBy(node), node);
  }
  walkForForegroundColor(context, node, image);
}

export function walkForSFSymbols(context: FigmaContext, node: ImageNode) {
  const { name } = node;

  const systemName = name.slice("SFSymbols#".length);

  const image: Image = {
    type: "Image",
    systemName,
    modifiers: [],
    parent: context.container,
    node: node,
  };
  context.addChild(image);

  walkForForegroundColor(context, node, image);
}
