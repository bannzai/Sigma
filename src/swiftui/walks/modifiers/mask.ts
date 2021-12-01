import { SwiftUIContext } from "../../context";
import { MaskModifier } from "../../types/modifiers";
import { View } from "../../types/views";
import { walk } from "../walk";

export function walkForMask(
  context: SwiftUIContext,
  view: View,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const modifier: MaskModifier = {
    type: "mask",
    shapeNode: maskingNode,
  };
  view.modifiers.push(modifier);
}
