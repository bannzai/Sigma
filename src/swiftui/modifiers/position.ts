import * as assert from "assert";
import { SwiftUIContext } from "../context";

export function walkForPosition(
  context: SwiftUIContext,
  node: LayoutMixin & SceneNode
) {
  const { latestFrameNode } = context;

  const { type, name } = node;
  console.log(JSON.stringify({ name, type, latestFrameNode }));
  if (latestFrameNode == null) {
    return;
  }
  if (
    latestFrameNode.frame === "VStack" ||
    latestFrameNode.frame === "HStack"
  ) {
    return;
  }

  const { x, y, width, height } = node;

  context.lineBreak();
  context.nest();
  context.add(`.position(x: ${x + width / 2}, y: ${y + height / 2})`);
  context.unnest();
}