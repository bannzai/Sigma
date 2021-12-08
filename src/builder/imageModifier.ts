import { ImageModifier } from "../types/imageModifier";
import { BuildContext } from "./context";

export function buildImageModifier(
  context: BuildContext,
  modifier: ImageModifier
) {
  if (modifier.type === "resizable") {
    context.add(`.resizable()`);
  }
}
