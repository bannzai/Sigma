import { FigmaContext } from "../context";
import { PaddingModifier } from "../../types/modifiers";
import { View } from "../../types/views";
import { trace } from "../tracer";

export function appendPadding(
  context: FigmaContext,
  view: View,
  node: BaseFrameMixin & SceneNode
) {
  trace("#appendPadding", context, node);
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
