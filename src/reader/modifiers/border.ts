const assert = require("assert");
import { FigmaContext } from "../context";
import { OverlayModifier } from "../../types/modifiers";
import { StrokeModifier } from "../../types/shapeModifier";
import { Rectangle, RoundedRectangle } from "../../types/shape";
import { View } from "../../types/views";
import { trace } from "../tracer";

export function appendBorder(
  context: FigmaContext,
  view: View,
  node: MinimalStrokesMixin & CornerMixin & SceneNode
) {
  trace("#appendBorder", context, node);
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
                        lineWidth: strokeWeight,
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
            };
            view.modifiers.push(overlay);
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
                        lineWidth: strokeWeight,
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
            };
            view.modifiers.push(overlay);
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
