import { trace } from "../tracer";
import { FigmaContext } from "../context";
import { appendFixedFrame } from "../modifiers/frame";
import { appendBorder } from "../modifiers/border";
import { appendPosition } from "../modifiers/position";
import { appendCornerRadius } from "../modifiers/cornerRadius";
import { createImage } from "../view/image";
import { walkForFixedSpacer } from "../view/spacer";
import { appendBackgroundColor } from "../modifiers/backgroundColor";
import { AsyncImage } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";

export function walkToRectangle(context: FigmaContext, node: RectangleNode) {
  trace(`#walkToRectangle`, context, node);
  const { name, fills } = node;

  if (name === "SwiftUI::Spacer") {
    walkForFixedSpacer(context, node);
  } else {
    if (fills !== figma.mixed) {
      for (const fill of fills) {
        if (fill.type === "IMAGE") {
          const image = createImage(context, node);
          if (fill.scaleMode === "FIT") {
            image.modifiers.push({ type: "resizable" });
            appendFixedFrame(context, image, node);
          }
          appendForegroundColor(context, node, image);

          if (name.startsWith("SwiftUI::AsyncImage")) {
            image.isAsyncImage = true;
            image.node = null;

            const asyncImage: AsyncImage = {
              type: "AsyncImage",
              image: image,
              modifiers: [],
              node: node,
            };
            context.addChild(asyncImage);
          } else {
            context.addChild(image);
          }
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
