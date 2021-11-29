import { SwiftUIViewModifier } from "../types/modifiers";
import { BuildContext } from "./context";

export function walkToModifier(
  context: BuildContext,
  modifier: SwiftUIViewModifier
) {
  if (modifier.type === "frame") {
  } else if (modifier.type === "padding") {
  } else if (modifier.type === "background") {
  } else if (modifier.type === "overlay") {
  } else if (modifier.type === "stroke") {
  } else if (modifier.type === "clipShape") {
  } else if (modifier.type === "mask") {
  } else if (modifier.type === "cornerRadius") {
  } else if (modifier.type === "position") {
  } else {
    const _: never = modifier;
  }
}
