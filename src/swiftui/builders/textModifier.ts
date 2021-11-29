import { SwiftUITextModifier } from "../types/textModifier";
import { BuildContext } from "./context";

export function walkToTextModifier(
  context: BuildContext,
  textModifier: SwiftUITextModifier
) {
  if (textModifier.type === "underline") {
  } else if (textModifier.type === "strikethrough") {
  } else if (textModifier.type === "fontWeight") {
  } else if (textModifier.type === "font") {
  } else if (textModifier.type === "foregroundColor") {
  } else {
    const _: never = textModifier;
  }
}
