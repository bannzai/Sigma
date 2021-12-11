import { OverlayModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { buildShape } from "./shape";
import { trace } from "./tracer";

export function buildOverlay(context: BuildContext, overlay: OverlayModifier) {
  trace("#buildOverlay", context, overlay);
  context.add(`.overlay(`, { withoutLineBreak: true });
  context.disableIndent();
  context.disableLineBreak();
  buildShape(context, overlay.shape);
  context.enableLineBreak();
  context.add(`)`);
  context.enableIndent();
}
