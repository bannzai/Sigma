import { Text } from "../types/views";
import { BuildContext } from "./context";
import { walkToModifier } from "./modifier";

export function walkToText(context: BuildContext, text: Text) {
  context.add(`Text("${text.text}")`);
  context.nest();
  text.modifiers.forEach((e) => {
    walkToModifier(context, e);
  });
  context.unnest();
}
