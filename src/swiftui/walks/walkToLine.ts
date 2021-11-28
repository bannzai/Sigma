import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForPosition } from "../modifiers/position";


export function walkToLine(context: SwiftUIContext, node: LineNode) {
  trace(`#walkToLine`, context, node);

  const { latestFrameNode } = context;

  if (latestFrameNode != null) {
    if (latestFrameNode.node.layoutMode === "VERTICAL") {
      context.lineBreak();
      context.add("Divider()\n");

      if (node.width !== context.root.width) {
        context.nest();
        context.add(`.frame(width: ${node.width})\n`);
        context.unnest();
      }
    } else if (latestFrameNode.node.layoutMode === "HORIZONTAL") {
      context.lineBreak();
      context.add("Divider()\n");

      if (node.height !== context.root.height) {
        context.nest();
        context.add(`.frame(height: ${node.height})\n`);
        context.unnest();
      }
    } else if (latestFrameNode.node.layoutMode === "NONE") {
      context.lineBreak();
      context.add("Divider()\n");

      walkForPosition(context, node);
    } else {
      const _: never = latestFrameNode.node.layoutMode;
    }
  }
}
