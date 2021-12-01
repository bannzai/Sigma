import { trace } from "../util/tracer";
import { FigmaContext } from "../context";
import { walkForPosition } from "./modifiers/position";
import { FrameModifier } from "../../types/modifiers";
import { Divider, isAxisView } from "../../types/views";

export function walkToLine(context: FigmaContext, node: LineNode) {
  trace(`#walkToLine`, context, node);

  const frame: FrameModifier = {
    type: "frame",
    alignment: "center",
  };

  if (context.root == null) {
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
      walkForPosition(context, context.findBy(node), node);
    }
  }

  const divider: Divider = {
    type: "Divider",
    modifiers: [frame],
    parent: context.container,
    node: node,
  };
  context.addChild(divider);
}
