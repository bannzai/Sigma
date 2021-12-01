import { ImageModifier } from "../swiftui/types/imageModifier";
import { mappedSwiftUIColor } from "../swiftui/util/mapper";
import { BuildContext } from "./context";

export function walkToImageModifier(
  context: BuildContext,
  modifier: ImageModifier
) {
  if (modifier.type === "resizable") {
    context.add(`.resizable()`);
  }
}
