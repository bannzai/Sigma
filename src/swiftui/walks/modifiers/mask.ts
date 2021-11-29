import { SwiftUIContext } from "../../context";
import { MaskModifier } from "../../types/modifiers";
import { walk } from "../walk";

export function walkForMask(
  context: SwiftUIContext,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const modifier: MaskModifier = {
    type: "mask",
    shapeNode: maskingNode,
  };
  context.adapt(modifier);
}
