import { View } from "../../types/views";
import { FigmaContext } from "../context";
import { appendBackgroundColor } from "./backgroundColor";
import { appendCornerRadius } from "./cornerRadius";
import { appendFrameModifierWithFrameNode } from "./frame";
import { appendPadding } from "./padding";
import { walkForPosition } from "./position";

export function adaptModifier(
  context: FigmaContext,
  view: View,
  node: SceneNode
) {
  if (node.type === "FRAME") {
    appendPadding(context, view, node);
    appendFrameModifierWithFrameNode(context, view, node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    walkForPosition(context, view, node);
  } else if (node.type === "RECTANGLE") {
    appendFrameModifierWithFrameNode(context, view, node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    walkForPosition(context, view, node);
  }
}
