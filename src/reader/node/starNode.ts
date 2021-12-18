import { trace } from "../tracer";
import { FigmaContext } from "../context";
import { walkForTextModifier } from "../modifiers/textModifier";
import { appendFrameModifierWithFrameNode } from "../modifiers/frame";
import { Image, Text } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";
import { appendDropShadow } from "../modifiers/dropShadow";

export function walkToStar(context: FigmaContext, node: StarNode) {
  trace(`#walkToStar`, context, node);
  const { fills, strokes } = node;

  if (strokes.length > 0) {
    const image: Image = {
      type: "Image",
      systemName: "star",
      modifiers: [],
      node: node,
    };
    context.addChild(image);
    appendForegroundColor(context, node, image);
    appendDropShadow(context, image, node);
  } else if (fills !== figma.mixed) {
    const fill = fills[0];
    if (fill.type === "SOLID") {
      const image: Image = {
        type: "Image",
        systemName: "star.fill",
        modifiers: [],
        node: node,
      };
      context.addChild(image);
      appendForegroundColor(context, node, image);
      appendDropShadow(context, image, node);
    }
  }
}
