import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";


export function walkToShapeWithText(
  context: SwiftUIContext,
  node: ShapeWithTextNode
) {
  trace(`#walkToShapeWithText`, context, node);
}
