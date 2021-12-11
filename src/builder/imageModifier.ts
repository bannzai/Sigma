import { ImageModifier } from "../types/imageModifier";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildImageModifier(
  context: BuildContext,
  modifier: ImageModifier
) {
  trace("#buildImageModifier", context, modifier);
  if (modifier.type === "resizable") {
    context.add(`.resizable()`);
  }
}
