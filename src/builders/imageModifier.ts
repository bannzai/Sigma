import { ImageModifier } from "../types/imageModifier";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";

export function walkToImageModifier(
  context: BuildContext,
  modifier: ImageModifier
) {
  if (modifier.type === "resizable") {
    context.add(`.resizable()`);
  }
}
