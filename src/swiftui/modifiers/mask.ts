import { SwiftUIContext } from "../context";
import { walk } from "../walks/walks";

export function walkForMask(
  context: SwiftUIContext,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const temporaryContext = new SwiftUIContext();
  temporaryContext.ignoredIndent = true;
  walk(temporaryContext, maskingNode);

  if (temporaryContext.code.length > 0) {
    context.nest();
    context.lineBreak();
    context.add(`.mask(${temporaryContext.code})\n`);
    context.unnest();
  }
}
