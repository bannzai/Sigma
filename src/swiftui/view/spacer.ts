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
  if (latestFrameNode == null || latestFrameNode.frame === "ZStack") {
    return;
  }
  if (latestFrameNode.frame === "VStack") {
    context.lineBreak();
    context.add("Spacer()\n");
    context.nest();
    context.add(`.frame(height: ${height})\n`);
    context.unnest();
  } else if (latestFrameNode.frame === "HStack") {
    context.lineBreak();
    context.add("Spacer()\n");
    context.nest();
    context.add(`.frame(width: ${width})\n`);
    context.unnest();
  } else {
    const _: never = latestFrameNode.frame;
  }
}
