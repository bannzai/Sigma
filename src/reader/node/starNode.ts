import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { walkForTextModifier } from "../modifiers/textModifier";
import { appendFrameModifierWithFrameNode } from "../modifiers/frame";
import { Image, Text } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";

export function walkToStar(context: FigmaContext, node: StarNode) {
  trace(`#walkToStar`, context, node);
  const { fills, strokes } = node;

  if (strokes.length > 0) {
    const image: Image = {
      type: "Image",
      systemName: "star",
      modifiers: [],
      parent: context.container,
      node: node,
    };
    context.addChild(image);
    appendForegroundColor(context, node, image);
  } else if (fills !== figma.mixed) {
    const fill = fills[0];
    if (fill.type === "SOLID") {
      const image: Image = {
        type: "Image",
        systemName: "star.fill",
        modifiers: [],
        parent: context.container,
        node: node,
      };
      context.addChild(image);
      appendForegroundColor(context, node, image);
    }
  }
}
