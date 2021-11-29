import { mappedSwiftUIColor } from "../util/mapper";
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
          name: "Color",
          red: 0,
          green: 0,
          blue: 0,
          opacity: opacity,
        };
        const background: BackgroundModifier = {
          name: "background",
          view: colorView,
        };
        context.adapt(background);
      } else {
        // TODO:
      }
    }
  }
}
