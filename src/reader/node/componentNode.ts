import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { appendPadding } from "../modifiers/padding";

export function walkToComponent(context: FigmaContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);
  const { documentationLinks, remote, variantProperties } = node;
  console.log(
    JSON.stringify({ documentationLinks, remote, variantProperties })
  );

  if (documentationLinks.length === 0 || remote) {
    return;
  }

  appendPadding(context, context.findBy(node), node);
}
