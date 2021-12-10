import { trace } from "../tracer";
import { FigmaContext } from "../../reader/context";
import { Ellipse } from "../../types/shape";

export function walkToEllipse(context: FigmaContext, node: EllipseNode) {
  trace(`#walkToEllipse`, context, node);
  const ellipse: Ellipse = {
    type: "Ellipse",
    modifiers: [],
    node: node,
  };
  context.addChild(ellipse);
}
