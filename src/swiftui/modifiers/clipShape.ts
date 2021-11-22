import { SwiftUIContext } from "../context";
import { walk } from "../walkers/walkers";

export function walkForClipShape(
  context: SwiftUIContext,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  context.nest();

  const temporaryContext = new SwiftUIContext();
  temporaryContext.ignoredIndent = true;
  walk(temporaryContext, maskingNode);

  if (temporaryContext.code.length > 0) {
    context.nest();
    context.lineBreak();
    context.add(`.clipShape(${temporaryContext.code})\n`);
    context.unnest();
  }

  context.unnest();
}
