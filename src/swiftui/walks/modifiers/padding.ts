import { SwiftUIContext } from "../../context";
import { PaddingModifier } from "../../types/modifiers";

export function walkForPadding(context: SwiftUIContext, node: BaseFrameMixin) {
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

  context.adapt(modifier);
}