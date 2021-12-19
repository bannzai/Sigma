import { FigmaContext } from "../context";
import { PositionModifier } from "../../types/modifiers";
import { isAxisView, View } from "../../types/views";
import { trace } from "../tracer";

export function appendPosition(
  context: FigmaContext,
  view: View,
  node: LayoutMixin & SceneNode
) {
  trace("#appendPosition", context, node);
  if (context.root == null) {
    return;
  }
  if (context.root.node?.id === node.id) {
    return;
  }
  if (view.node?.parent == null) {
    return;
  }

  const parent = context.findBy(view.node.parent);
  if (!isAxisView(parent) || parent.axis !== "Z") {
    return;
  }

  const { x, y, width, height } = node;
  const position: PositionModifier = {
    type: "position",
    x: x + width / 2,
    y: y + height / 2,
  };
  view.modifiers.push(position);
}
