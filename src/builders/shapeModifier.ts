import { SwiftUIViewShapeModifier } from "../swiftui/types/shapeModifier";
import { mappedSwiftUIColor } from "../swiftui/util/mapper";
import { BuildContext } from "./context";

export function walkToShapeModifier(
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
