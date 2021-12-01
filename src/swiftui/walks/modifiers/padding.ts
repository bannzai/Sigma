import { FigmaContext } from "../../context";
import { PaddingModifier } from "../../types/modifiers";
import { View } from "../../types/views";

export function walkForPadding(
  context: FigmaContext,
  view: View,
  node: BaseFrameMixin
) {
  const {
    paddingLeft: left,
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
  } = node;

  const modifier: PaddingModifier = {
    type: "padding",
    top,
    left,
    bottom,
    right,
  };

  view.modifiers.push(modifier);
}
