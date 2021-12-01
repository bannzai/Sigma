const assert = require("assert");
import { trace } from "../util/tracer";
import { FigmaContext } from "./context";
import { isBlendMixin } from "../util/type_guards";
import { walkForMask } from "./modifiers/mask";
import { walkForClipShape } from "./modifiers/clipShape";
import { walkForFixedFrame } from "./modifiers/frame/frame";
import { walkForPosition } from "./modifiers/position";
import { walk } from "./entrypoint";

export function walkToGroup(context: FigmaContext, node: GroupNode) {
  trace(`#walkToGroup`, context, node);

  const isContainMaskNode = node.children.some(
    (e) => isBlendMixin(e) && e.isMask
  );
  if (isContainMaskNode) {
    if (node.children.length === 2) {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      walk(context, target);

      const { id, width, height } = target;
      console.log(JSON.stringify({ id, width, height }));

      const maskNode = reversed[1] as BlendMixin & SceneNode;
      walkForClipShape(context, context.findBy(target), target, maskNode);
    } else {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      walk(context, target);

      reversed.slice(1).forEach((child) => {
        if (isBlendMixin(child)) {
          walkForMask(context, context.findBy(target), target, child);
        } else {
          assert(false, "unexpected is not mask node");
        }
      });
    }

    walkForFixedFrame(context, context.findBy(node), node);
  } else {
    node.children.forEach((child) => {
      walk(context, child);
    });
  }
  walkForPosition(context, context.findBy(node), node);
}
