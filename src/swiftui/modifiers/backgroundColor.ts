import { mappedSwiftUIColor } from "../util/mapper";
import { SwiftUIContext } from "../context";

export function walkForBackgroundColor(
  context: SwiftUIContext,
  node: MinimalFillsMixin & BaseNode
) {
  if (node.fills !== figma.mixed) {
    for (const fill of node.fills) {
      if (fill.type === "SOLID") {
        const { color, opacity } = fill;
        context.lineBreak();
        context.add(`.background(${mappedSwiftUIColor(color, opacity)})\n`);
      } else {
        // TODO:
      }
    }
  }
}
