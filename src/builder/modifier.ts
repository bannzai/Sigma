import { SwiftUIViewModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { buildPadding } from "./padding";
import { buildFrame } from "./frame";
import { buildBackground } from "./background";
import { buildOverlay } from "./overlay";
import { buildBody } from "./entrypoint";
import { trace } from "./tracer";

export function buildModifier(
  context: BuildContext,
  modifier: SwiftUIViewModifier
) {
  trace("#buildModifier", context, modifier);
  if (modifier.type === "frame") {
    buildFrame(context, modifier);
  } else if (modifier.type === "padding") {
    buildPadding(context, modifier);
  } else if (modifier.type === "background") {
    buildBackground(context, modifier);
  } else if (modifier.type === "overlay") {
    buildOverlay(context, modifier);
  } else if (modifier.type === "clipShape") {
    context.add(`.clipShape(`, { withoutLineBreak: false });
    context.disableLineBreak();
    context.disableIndent();
    buildBody(context, modifier.shapeNode);
    context.enableLineBreak();
    context.add(`)`);
    context.enableIndent();
  } else if (modifier.type === "mask") {
    context.add(`.mask(`, { withoutLineBreak: false });
    context.disableLineBreak();
    context.disableIndent();
    buildBody(context, modifier.shapeNode);
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
