import { SwiftUIViewShapeModifier } from "../types/shapeModifier";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";

export function buildShapeModifier(
  context: BuildContext,
  modifier: SwiftUIViewShapeModifier
) {
  if (modifier.type === "stroke") {
    context.add(
      `.stroke(${mappedSwiftUIColor(modifier.color)}, lineWidth: ${
        modifier.lineWidth
      })`
    );
  }
}
