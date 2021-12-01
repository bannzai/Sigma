import { trace } from "../../util/tracer";
import { FigmaContext } from "./context";


export function walkToShapeWithText(
  context: FigmaContext,
  node: ShapeWithTextNode
) {
  trace(`#walkToShapeWithText`, context, node);
}
