import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";


export function walkToEllipse(context: SwiftUIContext, node: EllipseNode) {
  trace(`#walkToEllipse`, context, node);
  context.add("Ellipse()");
}
