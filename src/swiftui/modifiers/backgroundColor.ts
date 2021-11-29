import { SwiftUIContext } from "../context";
import { Color } from "../types/views";
import { BackgroundModifier } from "../types/modifiers";

export function walkForBackgroundColor(
  context: SwiftUIContext,
  node: MinimalFillsMixin & BaseNode
) {
  if (node.fills !== figma.mixed) {
    for (const fill of node.fills) {
      if (fill.type === "SOLID") {
        const { color, opacity } = fill;
        const colorView: Color = {
          type: "Color",
          red: color.r,
          green: color.g,
          blue: color.b,
          opacity: opacity,
        };
        const background: BackgroundModifier = {
          type: "background",
          view: colorView,
        };
        context.adapt(background);
      } else {
        // TODO:
      }
    }
  }
}
