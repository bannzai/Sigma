import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import {
  appendFixedFrame,
  appendFrameModifierWithFrameNode,
} from "../modifiers/frame";
import { appendBorder } from "../modifiers/border";
import { appendPosition } from "../modifiers/position";
import { appendCornerRadius } from "../modifiers/cornerRadius";
import { walkForImage } from "../view/image";
import { walkForFixedSpacer } from "../view/spacer";
import { appendPadding } from "../modifiers/padding";
import { appendBackgroundColor } from "../modifiers/backgroundColor";

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

    const view = context.findBy(node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    appendBorder(context, view, node);
    appendPosition(context, view, node);
  }
}
