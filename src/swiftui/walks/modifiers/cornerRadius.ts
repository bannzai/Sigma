import { SwiftUIContext } from "../../context";
import { CornerRadiusModifier } from "../../types/modifiers";

export function walkForCornerRadius(
  context: SwiftUIContext,
  node: CornerMixin & SceneNode
) {
  const { cornerRadius } = node;
  if (cornerRadius !== figma.mixed) {
    if (cornerRadius !== 0) {
      const modifier: CornerRadiusModifier = {
        type: "cornerRadius",
        cornerRadius,
      };
      context.adapt(modifier);
    }
  }
}
