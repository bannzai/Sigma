import * as assert from "assert";
import { SwiftUIContext } from "../context";

export function walkForPosition(
  context: SwiftUIContext,
  node: LayoutMixin & SceneNode
) {
  const { latestFrameNode } = context;

  if (context.root.id === node.id) {
    return;
  }
  if (latestFrameNode == null) {
    return;
  }
  if (
    latestFrameNode.node.layoutMode === "VERTICAL" ||
    latestFrameNode.node.layoutMode === "HORIZONTAL"
  ) {
    return;
  }

  const { x, y, width, height } = node;

  context.lineBreak();
  context.nest();
  context.add(`.position(x: ${x + width / 2}, y: ${y + height / 2})`);
  context.unnest();
}
