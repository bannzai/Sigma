import { View } from "../../types/views";
import { FigmaContext } from "../context";
import { walkForBackgroundColor } from "./backgroundColor";
import { walkForCornerRadius } from "./cornerRadius";
import { adaptFrameModifierWithFrameNode } from "./frame";
import { adaptPadding } from "./padding";
import { walkForPosition } from "./position";

export function adaptModifier(
  context: FigmaContext,
  view: View,
  node: SceneNode
) {
  if (node.type === "FRAME") {
    adaptPadding(context, view, node);
    adaptFrameModifierWithFrameNode(context, view, node);
    walkForBackgroundColor(context, view, node);
    walkForCornerRadius(context, view, node);
    walkForPosition(context, view, node);
  } else if (node.type === "RECTANGLE") {
    adaptFrameModifierWithFrameNode(context, view, node);
    walkForBackgroundColor(context, view, node);
    walkForCornerRadius(context, view, node);
    walkForPosition(context, view, node);
  }
}
