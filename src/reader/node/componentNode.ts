import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { walkForPadding } from "../modifiers/padding";

export function walkToComponent(context: FigmaContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);
  const { documentationLinks } = node;

  if (documentationLinks.length === 0) {
    return;
  }

  walkForPadding(context, context.findBy(node), node);
}
