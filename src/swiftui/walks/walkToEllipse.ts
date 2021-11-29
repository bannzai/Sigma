import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { Ellipse } from "../types/shape";

export function walkToEllipse(context: SwiftUIContext, node: EllipseNode) {
  trace(`#walkToEllipse`, context, node);
  const ellipse: Ellipse = {
    type: "Ellipse",
    modifiers: [],
    parent: context.container,
    node: node,
  };
  context.addChild(ellipse);
}
