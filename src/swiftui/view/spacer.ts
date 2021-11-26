import { SwiftUIContext } from "../context";

export function walkForFixedSpacer(
  context: SwiftUIContext,
  rectangle: RectangleNode
) {
  const { name, width, height, fills } = rectangle;

  if (name !== "SwiftUI::Spacer") {
    return;
  }
  if (fills === figma.mixed) {
    return;
  }
  if (fills.length !== 0) {
    return;
  }

  const { latestFrameNode } = context;
  if (latestFrameNode == null || latestFrameNode.node.layoutMode === "NONE") {
    return;
  }
  if (latestFrameNode.node.layoutMode === "VERTICAL") {
    if (!latestFrameNode.isOnlyOneChild) {
      context.lineBreak();
      context.add("Spacer()\n");
      context.nest();
      context.add(`.frame(height: ${height})\n`);
      context.unnest();
    }
  } else if (latestFrameNode.node.layoutMode === "HORIZONTAL") {
    if (!latestFrameNode.isOnlyOneChild) {
      context.lineBreak();
      context.add("Spacer()\n");
      context.nest();
      context.add(`.frame(width: ${width})\n`);
      context.unnest();
    }
  } else {
    const _: never = latestFrameNode.node.layoutMode;
  }
}
