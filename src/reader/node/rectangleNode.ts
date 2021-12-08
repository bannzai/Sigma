import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { walkForFixedFrame } from "../modifiers/frame";
import { walkForBorder } from "../modifiers/border";
import { walkForPosition } from "../modifiers/position";
import { appendCornerRadius } from "../modifiers/cornerRadius";
import { walkForImage } from "../view/image";
import { walkForFixedSpacer } from "../view/spacer";

export function walkToRectangle(context: FigmaContext, node: RectangleNode) {
  trace(`#walkToRectangle`, context, node);
  const { name, fills } = node;

  if (name === "SwiftUI::Spacer") {
    walkForFixedSpacer(context, node);
  } else {
    if (fills !== figma.mixed) {
      for (const fill of fills) {
        if (fill.type === "IMAGE") {
          walkForImage(context, fill, node);
        }
      }
    }

    appendCornerRadius(context, context.findBy(node), node);
    walkForBorder(context, context.findBy(node), node);
    walkForPosition(context, context.findBy(node), node);
  }
}
