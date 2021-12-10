import { BackgroundModifier } from "../types/modifiers";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildBackground(
  context: BuildContext,
  background: BackgroundModifier
) {
  trace("#buildBackground", context, background);
  if (background.view.type === "Color") {
    const color = background.view;
    context.add(`.background(${mappedSwiftUIColor(color)})`);
  }
}
