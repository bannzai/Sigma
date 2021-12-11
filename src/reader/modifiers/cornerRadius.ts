import { FigmaContext } from "../context";
import { CornerRadiusModifier } from "../../types/modifiers";
import { View } from "../../types/views";
import { trace } from "../tracer";

export function appendCornerRadius(
  context: FigmaContext,
  view: View,
  node: CornerMixin & SceneNode
) {
  trace("#appendCornerRadius", context, node);
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
