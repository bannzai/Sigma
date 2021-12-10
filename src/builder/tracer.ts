import { ImageModifier } from "../types/imageModifier";
import { Modifier } from "../types/modifiers";
import { TextModifier } from "../types/textModifier";
import { View } from "../types/views";
import { BuildContext } from "./context";

export function trace(
  prefix: string = "",
  context: BuildContext,
  view: View | Modifier | ImageModifier | TextModifier
) {
  const { type } = view;
  console.log(`${prefix} ${JSON.stringify({ type })}`);
}
