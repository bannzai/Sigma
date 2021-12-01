import { BackgroundModifier } from "../types/modifiers";
import { mappedSwiftUIColor } from "../swiftui/util/mapper";
import { BuildContext } from "./context";

export function walkToBackground(
  context: BuildContext,
  background: BackgroundModifier
) {
  if (background.view.type === "Color") {
    const color = background.view;
    context.add(`.background(${mappedSwiftUIColor(color)})`);
  }
}
