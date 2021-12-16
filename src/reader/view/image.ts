import { FigmaContext } from "../context";
import { Image } from "../../types/views";
import { trace } from "../tracer";

export type ImageNode = DefaultShapeMixin & SceneNode;

export function createImage(context: FigmaContext, node: ImageNode): Image {
  trace("createImage", context, node);
  const { name } = node;

  let image: Image;
  if (name.startsWith("SFSymbols#")) {
    const systemName = name.slice("SFSymbols#".length);
    image = {
      type: "Image",
      systemName,
      modifiers: [],
      node: node,
    };
  } else {
    image = {
      type: "Image",
      name,
      modifiers: [],
      node: node,
    };
  }
  return image;
}
