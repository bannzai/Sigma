import { FigmaContext } from "../context";
import { Image } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";
import { appendFixedFrame } from "../modifiers/frame";
import { trace } from "../tracer";

export type ImageNode = DefaultShapeMixin & SceneNode;

export function walkForImage(
  context: FigmaContext,
  fill: ImagePaint,
  node: ImageNode
) {
  trace("#walkForImage", context, node);
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
  context.addChild(image);

  if (fill.scaleMode === "FIT") {
    image.modifiers.push({ type: "resizable" });
    appendFixedFrame(context, image, node);
  }
  appendForegroundColor(context, node, image);
}
