import * as assert from "assert";
import { FigmaContext } from "../context";
import { trace } from "../tracer";
import { isBlendMixin } from "../../util/type_guards";
import { appendClipShape } from "../modifiers/clipShape";
import { appendFixedFrame } from "../modifiers/frame";
import { traverse } from "../entrypoint";
import { appendDropShadow } from "../modifiers/dropShadow";
import { appendMask } from "../modifiers/mask";

export function walkToGroup(context: FigmaContext, node: GroupNode) {
  trace(`#walkToGroup`, context, node);

  const isContainMaskNode = node.children.some(
    (e) => isBlendMixin(e) && e.isMask
  );
  if (isContainMaskNode) {
    if (node.children.length === 2) {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      traverse(context, target);

      const { id, width, height } = target;
      console.log(JSON.stringify({ id, width, height }));

      const maskNode = reversed[1] as BlendMixin & SceneNode;
      const targetView = context.findBy(target);
      if (targetView != null) {
        appendClipShape(context, targetView, target, maskNode);
      }
    } else {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      traverse(context, target);

      reversed.slice(1).forEach((child) => {
        if (isBlendMixin(child)) {
          const targetView = context.findBy(target);
          if (targetView != null) {
            appendMask(context, targetView, target, child);
          }
        } else {
          assert(false, "unexpected is not mask node");
        }
      });
    }

    const targetView = context.findBy(node);
    if (targetView != null) {
      appendFixedFrame(context, targetView, node);
      appendDropShadow(context, targetView, node);
    }
  } else {
    node.children.forEach((child) => {
      traverse(context, child);
    });
  }
}
