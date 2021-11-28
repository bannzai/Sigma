import * as assert from "assert";
import { isFakeRootView, SwiftUIContext } from "../context";
import { PositionModifier } from "../types/modifiers";
import { ZStack } from "../types/views";

export function walkForPosition(
  context: SwiftUIContext,
  node: LayoutMixin & SceneNode
) {
  if (isFakeRootView(context.root)) {
    return;
  }
  if (context.root.node?.id === node.id) {
    return;
  }

  const { x, y, width, height } = node;
  const position: PositionModifier = {
    type: "position",
    x: x + width / 2,
    y: y + height / 2,
  };
  context.adapt(position);
}
