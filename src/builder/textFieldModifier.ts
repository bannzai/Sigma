import { SwiftUITextFieldModifier } from "../types/textFieldModifier";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildTextFieldModifier(
  context: BuildContext,
  textFieldModifier: SwiftUITextFieldModifier
) {
  trace("#buildTextFieldModifier", context, textFieldModifier);

  if (textFieldModifier.type === "textFieldStyle") {
    context.add(`.textFieldStyle(${textFieldModifier.name}())`);
  }
}
