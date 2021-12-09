const assert = require("assert");
import { FigmaContext } from "../context";
import { trace } from "../../util/tracer";
import { isBlendMixin } from "../../util/type_guards";
import { walkForMask as appendMask } from "../modifiers/mask";
import { appendClipShape } from "../modifiers/clipShape";
import { walkForFixedFrame } from "../modifiers/frame";
import { appendPosition } from "../modifiers/position";
import { traverse } from "../entrypoint";

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
      appendClipShape(context, context.findBy(target), target, maskNode);
    } else {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      traverse(context, target);

      reversed.slice(1).forEach((child) => {
        if (isBlendMixin(child)) {
          appendMask(context, context.findBy(target), target, child);
        } else {
          assert(false, "unexpected is not mask node");
        }
      });
    }

    walkForFixedFrame(context, context.findBy(node), node);
  } else {
    node.children.forEach((child) => {
      traverse(context, child);
    });
  }
  appendPosition(context, context.findBy(node), node);
}
