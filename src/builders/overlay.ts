import { OverlayModifier } from "../swiftui/types/modifiers";
import { BuildContext } from "./context";
import { walkToShape } from "./shape";

export function walkToOverlay(context: BuildContext, overlay: OverlayModifier) {
  context.add(`.overlay(`, { withoutLineBreak: true });
  context.disableIndent();
  context.disableLineBreak();
  walkToShape(context, overlay.shape);
  context.enableLineBreak();
  context.add(`)`);
  context.enableIndent();
}
