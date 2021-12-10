import { trace } from "../tracer";
import { FigmaContext } from "../context";

export function walkToShapeWithText(
  context: FigmaContext,
  node: ShapeWithTextNode
) {
  trace(`#walkToShapeWithText`, context, node);
}
