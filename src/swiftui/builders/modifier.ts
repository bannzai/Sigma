import { SwiftUIViewModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { walkToPadding } from "./padding";
import { walkToFrame } from "./frame";
import { walkToBackground } from "./background";

export function walkToModifier(
  context: BuildContext,
  modifier: SwiftUIViewModifier
) {
  if (modifier.type === "frame") {
    walkToFrame(context, modifier);
  } else if (modifier.type === "padding") {
    walkToPadding(context, modifier);
  } else if (modifier.type === "background") {
    walkToBackground(context, modifier);
  } else if (modifier.type === "overlay") {
  } else if (modifier.type === "clipShape") {
  } else if (modifier.type === "mask") {
  } else if (modifier.type === "cornerRadius") {
  } else if (modifier.type === "position") {
  } else {
    const _: never = modifier;
  }
}
