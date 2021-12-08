import { SwiftUIViewModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { buildPadding } from "./padding";
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
    buildPadding(context, modifier);
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
    context.add(`)`);
    context.enableIndent();
  } else if (modifier.type === "mask") {
    context.add(`.mask(`, { withoutLineBreak: false });
    context.disableLineBreak();
    context.disableIndent();
    walk(context, modifier.shapeNode);
    context.enableLineBreak();
    context.enableIndent();
    context.add(`)`);
  } else if (modifier.type === "cornerRadius") {
    context.add(`.cornerRadius(${modifier.cornerRadius})`);
  } else if (modifier.type === "position") {
    context.add(`.position(x: ${modifier.x}, y: ${modifier.y})`);
  } else {
    const _: never = modifier;
  }
}
