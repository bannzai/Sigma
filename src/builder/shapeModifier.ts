import { SwiftUIViewShapeModifier } from "../types/shapeModifier";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildShapeModifier(
  context: BuildContext,
  modifier: SwiftUIViewShapeModifier
) {
  trace("#buildShapeModifier", context, modifier);
  if (modifier.type === "stroke") {
    context.add(
      `.stroke(${mappedSwiftUIColor(modifier.color)}, lineWidth: ${
        modifier.lineWidth
      })`
    );
  }
}
