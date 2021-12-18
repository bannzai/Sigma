import { trace } from "../tracer";
import { FigmaContext } from "../context";
import { Image } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";
import { appendFixedFrame } from "../modifiers/frame";
import { appendDropShadow } from "../modifiers/dropShadow";

export function walkToVector(context: FigmaContext, node: VectorNode) {
  const { name, fills } = node;
  trace(`walkToVector`, context, node, { fills });

  if (name.startsWith("SFSymbols#")) {
    const systemName = name.slice("SFSymbols#".length);
    const image: Image = {
      type: "Image",
      systemName,
      modifiers: [],
      node: node,
    };
    context.addChild(image);

    if (fills !== figma.mixed) {
      for (const fill of fills) {
        if (fill.type === "IMAGE") {
          if (fill.scaleMode === "FIT") {
            image.modifiers.push({ type: "resizable" });
            appendFixedFrame(context, image, node);
          }
        }
      }
    }

    appendForegroundColor(context, node, image);
    appendDropShadow(context, image, node);
  }
}
