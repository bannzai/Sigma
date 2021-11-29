import { isSwiftUITextModifier } from "../types/textModifier";
import { Text } from "../types/views";
import { BuildContext } from "./context";
import { walkToModifier } from "./modifier";
import { walkToTextModifier } from "./textModifier";

export function walkToText(context: BuildContext, text: Text) {
  context.add(`Text("${text.text}")`);
  context.nest();
  text.modifiers.forEach((e) => {
    if (isSwiftUITextModifier(e)) {
      walkToTextModifier(context, e);
    } else {
      walkToModifier(context, e);
    }
  });
  context.unnest();
}
