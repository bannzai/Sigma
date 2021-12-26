import { SwiftUIButtonModifier } from "../types/buttonModifier";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildButtonModifier(
  context: BuildContext,
  buttonModifier: SwiftUIButtonModifier
) {
  trace("#buildButtonModifier", context, buttonModifier);

  if (buttonModifier.type === "buttonStyle") {
    context.add(`.buttonStyle(${buttonModifier.name}())`);
  }
}
