import { FigmaContext } from "../context";
import { MaskModifier } from "../../types/modifiers";
import { View } from "../../types/views";

export function appendMask(
  _context: FigmaContext,
  view: View,
  _maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const modifier: MaskModifier = {
    type: "mask",
    shapeNode: maskingNode,
  };
  view.modifiers.push(modifier);
}
