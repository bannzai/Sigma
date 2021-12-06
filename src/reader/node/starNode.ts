import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { walkForTextModifier } from "../modifiers/textModifier";
import { adaptFrameModifierWithFrameNode } from "../modifiers/frame";
import { Image, Text } from "../../types/views";
import { walkForForegroundColor } from "../modifiers/foregroundColor";

export function walkToStar(context: FigmaContext, node: StarNode) {
  trace(`#walkToText`, context, node);
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
    walkForForegroundColor(context, node, image);
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
      walkForForegroundColor(context, node, image);
    }
  }

  adaptFrameModifierWithFrameNode(context, context.findBy(node), node);
}
