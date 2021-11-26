import * as assert from "assert";
import { mappedSwiftUIColor } from "../util/mapper";
import { SwiftUIContext } from "../context";

export function walkForBorder(
  context: SwiftUIContext,
  node: MinimalStrokesMixin & CornerMixin & SceneNode
) {
  const { strokes, strokeAlign, strokeWeight, cornerRadius } = node;

  for (const stroke of strokes) {
    if (stroke.type === "SOLID") {
      context.lineBreak();

      if (strokeAlign === "INSIDE") {
        context.nest();
        if (cornerRadius !== figma.mixed) {
          if (cornerRadius === 0) {
            context.add(
              `.overlay(Rectangle().stroke(${mappedSwiftUIColor(
                stroke.color,
                stroke.opacity
              )}, lineWidth: ${strokeWeight}))`
            );
          } else {
            context.add(
              `.overlay(RoundedRectangle(cornerRadius: ${cornerRadius}).stroke(${mappedSwiftUIColor(
                stroke.color,
                stroke.opacity
              )}, lineWidth: ${strokeWeight}))`
            );
          }
        }
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
