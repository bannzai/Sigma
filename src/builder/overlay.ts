import { OverlayModifier } from "../types/modifiers";
import { BuildContext } from "./context";
import { buildShape } from "./shape";

export function walkToOverlay(context: BuildContext, overlay: OverlayModifier) {
  context.add(`.overlay(`, { withoutLineBreak: true });
  context.disableIndent();
  context.disableLineBreak();
  buildShape(context, overlay.shape);
  context.enableLineBreak();
  context.add(`)`);
  context.enableIndent();
}
