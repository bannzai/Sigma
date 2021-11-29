import { OverlayModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { walkToShape } from "./shape";

export function walkToOverlay(context: BuildContext, overlay: OverlayModifier) {
  context.add(`.overlay(`, { withoutLineBreak: true });
  context.disableIndent();
  context.disableLineBreak();
  walkToShape(context, overlay.shape);
  context.enableIndent();
  context.enableLineBreak();
  context.add(`)`);
}
