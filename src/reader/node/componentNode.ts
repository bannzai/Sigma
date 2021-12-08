import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { traverse } from "../entrypoint";
import { adaptModifier } from "../modifiers/adaptModifier";
import { appendPadding } from "../modifiers/padding";

export function walkToComponent(context: FigmaContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);
  const { children, remote, variantProperties } = node;
  console.log(JSON.stringify({ children, remote, variantProperties }));

  if (remote) {
    return;
  }

  children.forEach((e) => {
    traverse(context, e);
  });
}
