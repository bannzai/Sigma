import { FigmaContext } from "../../reader/context";
import { FrameModifier } from "../../types/modifiers";
import { isAxisView } from "../../types/views";

export function walkForFixedSpacer(
  context: FigmaContext,
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
      type: "frame",
      height,
      alignment: "center",
    };
    context.addChild({
      type: "Spacer",
      modifiers: [frame],
      parent: null,
      node: null,
    });
  } else if (context.container.axis === "H") {
    const frame: FrameModifier = {
      type: "frame",
      width,
      alignment: "center",
    };
    context.addChild({
      type: "Spacer",
      modifiers: [frame],
      parent: null,
      node: null,
    });
  }
}
