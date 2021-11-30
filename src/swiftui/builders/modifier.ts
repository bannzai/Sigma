import { SwiftUIViewModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { walkToPadding } from "./padding";
import { walkToFrame } from "./frame";
import { walkToBackground } from "./background";
import { walkToOverlay } from "./overlay";
import { walk } from "./entrypoint";

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
    walkToOverlay(context, modifier);
  } else if (modifier.type === "clipShape") {
    context.add(`.clipShape(`, { withoutLineBreak: false });
    context.disableLineBreak();
    context.disableIndent();
    walk(context, modifier.shapeNode);
    context.enableLineBreak();
    context.enableIndent();
    context.add(`)`);
  } else if (modifier.type === "mask") {
  } else if (modifier.type === "cornerRadius") {
  } else if (modifier.type === "position") {
  } else {
    const _: never = modifier;
  }
}
