import { FigmaContext } from "../context";
import { View } from "../../types/views";
import { ForegorundTextModifier } from "../../types/textModifier";
import { trace } from "../tracer";

export function appendForegroundColor(
  context: FigmaContext,
  node: DefaultShapeMixin & SceneNode,
  view: View
) {
  trace("#appendForegroundColor", context, node);
  if (node.fills !== figma.mixed) {
    for (const fill of node.fills) {
      if (fill.type === "SOLID") {
        const { color, opacity } = fill;
        const modifier: ForegorundTextModifier = {
          type: "foregroundColor",
          color: {
            type: "Color",
            red: color.r,
            green: color.g,
            blue: color.b,
            opacity: opacity,
          },
        };

        view.modifiers.push(modifier);
      }
    }
  }
}
