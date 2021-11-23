import * as assert from "assert";
import { mappedSwiftUIColor } from "../../util/mapper";
import { SwiftUIContext } from "../context";

export function walkForBorder(
  context: SwiftUIContext,
  node: MinimalStrokesMixin & SceneNode
) {
  const { name, strokes, strokeAlign, strokeWeight } = node;

  for (const stroke of strokes) {
    if (stroke.type === "SOLID") {
      context.lineBreak();

      if (strokeAlign === "INSIDE") {
        context.nest();
        context.add(
          `.border(${mappedSwiftUIColor(
            stroke.color,
            stroke.opacity
          )}, width: ${strokeWeight})\n`
        );
        context.unnest();
      } else {
        assert(
          false,
          "Sigma is not support CENTER and OUTSIDE border. SwiftUI only support INSIDE"
        );
      }
    }
  }
}
