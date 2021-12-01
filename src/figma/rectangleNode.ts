import { trace } from "../util/tracer";
import { FigmaContext } from "./context";
import { walkForImage } from "../swiftui/view/image";
import { walkForFixedFrame } from "./modifiers/frame/frame";
import { walkForBorder } from "./modifiers/border";
import { walkForPosition } from "./modifiers/position";
import { walkForFixedSpacer } from "../swiftui/view/spacer";
import { walkForCornerRadius } from "./modifiers/cornerRadius";

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
          if (fill.scaleMode === "FIT") {
            walkForFixedFrame(context, context.findBy(node), node);
          }
        }
      }
    }

    walkForCornerRadius(context, context.findBy(node), node);
    walkForBorder(context, context.findBy(node), node);
    walkForPosition(context, context.findBy(node), node);
  }
}