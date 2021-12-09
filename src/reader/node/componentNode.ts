import { ZStack } from "../../types/views";
import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { traverse } from "../entrypoint";
import { appendBackgroundColor } from "../modifiers/backgroundColor";

export function walkToComponent(context: FigmaContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);
  const { children, remote } = node;

  if (remote) {
    return;
  }

  if (children.length > 1) {
    const zstack: ZStack = {
      type: "ZStack",
      axis: "Z",
      modifiers: [],
      parent: context.container,
      node: node,
      children: [],
    };
    context.addChild(zstack);

    context.nestContainer(zstack);
    children.forEach((e) => {
      traverse(context, e);
    });
    context.unnestContainer();

    appendBackgroundColor(context, zstack, node);
  } else {
    const child = children[0];
    traverse(context, child);
    appendBackgroundColor(context, context.findBy(child), node);
  }
}
