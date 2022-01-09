import { SwiftUIListModifier } from "../types/listModifier";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildListModifier(
  context: BuildContext,
  listModifier: SwiftUIListModifier
) {
  trace("#buildListModifier", context, listModifier);

  if (listModifier.type === "listStyle") {
    context.add(`.listStyle(${listModifier.name}())`);
  }
}
