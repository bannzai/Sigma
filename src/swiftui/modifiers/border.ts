import * as assert from "assert";
import { mappedSwiftUIColor } from "../util/mapper";
import { SwiftUIContext } from "../context";
import { OverlayModifier, StrokeModifier } from "../types/modifiers";
import { Rectangle, RoundedRectangle } from "../types/views";

export function walkForBorder(
  context: SwiftUIContext,
  node: MinimalStrokesMixin & CornerMixin & SceneNode
) {
  const { strokes, strokeAlign, strokeWeight, cornerRadius } = node;

  for (const stroke of strokes) {
    if (stroke.type === "SOLID") {
      if (strokeAlign === "INSIDE") {
        if (cornerRadius !== figma.mixed) {
          if (cornerRadius === 0) {
            const overlay: OverlayModifier = {
              type: "overlay",
              shape: (function (): Rectangle {
                return {
                  type: "Rectangle",
                  parent: null,
                  modifiers: [
                    (function (): StrokeModifier {
                      return {
                        type: "stroke",
                        color: (function () {
                          return {
                            type: "Color",
                            red: stroke.color.r,
                            green: stroke.color.g,
                            blue: stroke.color.b,
                            opacity: stroke.opacity,
                          };
                        })(),
                      };
                    })(),
                  ],
                  node: null,
                };
              })(),
              lineWidth: strokeWeight,
            };
            context.adapt(overlay);
          } else {
            const overlay: OverlayModifier = {
              type: "overlay",
              shape: (function (): RoundedRectangle {
                return {
                  type: "RoundedRectangle",
                  parent: null,
                  modifiers: [
                    (function (): StrokeModifier {
                      return {
                        type: "stroke",
                        color: (function () {
                          return {
                            type: "Color",
                            red: stroke.color.r,
                            green: stroke.color.g,
                            blue: stroke.color.b,
                            opacity: stroke.opacity,
                          };
                        })(),
                      };
                    })(),
                  ],
                  node: null,
                  cornerRadius: cornerRadius,
                };
              })(),
              lineWidth: strokeWeight,
            };
            context.adapt(overlay);
          }
        }
      } else {
        assert(
          false,
          "Sigma is not support CENTER and OUTSIDE border. SwiftUI only support INSIDE"
        );
      }
    }
  }
}
