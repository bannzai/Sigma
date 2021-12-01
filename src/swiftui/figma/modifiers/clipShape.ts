import { FigmaContext } from "../context";
import { ClipShapeModifier } from "../../../types/modifiers";
import { View } from "../../../types/views";
import { walk } from "../walk";

export function walkForClipShape(
  context: FigmaContext,
  view: View,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const clipShape: ClipShapeModifier = {
    type: "clipShape",
    shapeNode: maskingNode,
  };
  view.modifiers.push(clipShape);
}
