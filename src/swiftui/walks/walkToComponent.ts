import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForPadding } from "../modifiers/padding";


export function walkToComponent(context: SwiftUIContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);

  walkForPadding(context, node);
}
