import { SwiftUIContext } from "../context";
import { FrameModifier } from "../types/modifiers";
import { isAxisView } from "../types/views";

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

  if (!isAxisView(context.container)) {
    return;
  }

  if (context.container.axis === "V") {
    const frame: FrameModifier = {
      name: "frame",
      height,
    };
    context.addChild({
      name: "Spacer",
      modifiers: [frame],
      parent: null,
      node: null,
    });
  } else if (context.container.axis === "H") {
    const frame: FrameModifier = {
      name: "frame",
      width,
    };
    context.addChild({
      name: "Spacer",
      modifiers: [frame],
      parent: null,
      node: null,
    });
  }
}
