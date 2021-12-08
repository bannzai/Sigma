import { FigmaContext } from "../context";
import { CornerRadiusModifier } from "../../types/modifiers";
import { View } from "../../types/views";

export function appendCornerRadius(
  context: FigmaContext,
  view: View,
  node: CornerMixin & SceneNode
) {
  const { cornerRadius } = node;
  if (cornerRadius !== figma.mixed) {
    if (cornerRadius !== 0) {
      const modifier: CornerRadiusModifier = {
        type: "cornerRadius",
        cornerRadius,
      };
      view.modifiers.push(modifier);
    }
  }
}
