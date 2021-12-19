import {
  CompositingGroupModifier,
  ShadowModifier,
} from "../../types/modifiers";
import { View } from "../../types/views";
import { FigmaContext } from "../context";
import { trace } from "../tracer";

export function appendDropShadow(
  context: FigmaContext,
  view: View,
  node: SceneNode & BlendMixin
) {
  const { effects } = node;
  trace("#appendDropShadow", context, node, { effects });
  for (const effect of effects) {
    if (effect.type === "DROP_SHADOW") {
      const { color, radius, offset } = effect;
      const { x, y } = offset;

      const compositingGroupModifier: CompositingGroupModifier = {
        type: "compositingGroup",
      };
      view.modifiers.push(compositingGroupModifier);

      const shadow: ShadowModifier = {
        type: "shadow",
        color: {
          type: "Color",
          red: color.r,
          green: color.g,
          blue: color.b,
          opacity: color.a,
        },
        radius,
        x,
        y,
      };
      view.modifiers.push(shadow);
    }
  }
}
