import { trace } from "../tracer";
import { FigmaContext } from "../context";
import { appendPosition } from "../modifiers/position";
import { FrameModifier } from "../../types/modifiers";
import { Divider, isAxisView } from "../../types/views";
import { appendDropShadow } from "../modifiers/dropShadow";

export function walkToLine(context: FigmaContext, node: LineNode) {
  trace(`#walkToLine`, context, node);

  const frame: FrameModifier = {
    type: "frame",
    alignment: "center",
  };

  if (context.root == null || context.container == null) {
    return;
  }
  if (isAxisView(context.container)) {
    if (context.container.axis === "V") {
      if (context.container.node?.width !== context.root.node?.width) {
        frame.width = node.width;
      }
    } else if (context.container.axis === "H") {
      if (context.container.node?.height !== context.root.node?.height) {
        frame.height = node.height;
      }
    } else if (context.container.axis === "Z") {
      const view = context.findBy(node);
      if (view != null) {
        appendPosition(context, view, node);
      }
    }
  }

  const divider: Divider = {
    type: "Divider",
    modifiers: [frame],
    node: node,
  };
  context.addChild(divider);

  appendDropShadow(context, divider, node);
}
