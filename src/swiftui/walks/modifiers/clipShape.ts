import { SwiftUIContext } from "../../context";
import { ClipShapeModifier } from "../../types/modifiers";
import { walk } from "../walk";

export function walkForClipShape(
  context: SwiftUIContext,
  maskingTargetNode: SceneNode,
  maskingNode: BlendMixin & SceneNode
) {
  const clipShape: ClipShapeModifier = {
    type: "clipShape",
    shapeNode: maskingNode,
  };
  context.adapt(clipShape);
}
