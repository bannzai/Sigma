import { FigmaContext } from "../context";
import { View } from "../../types/views";
import {
  ForegorundTextModifier,
  NamedFontWeight,
} from "../../types/textModifier";
import { trace } from "../../util/tracer";

export function appendForegroundColor(
  context: FigmaContext,
  node: DefaultShapeMixin & SceneNode,
  view: View
) {
  trace("#appendForegroundColor", context, node);
  if (node.fills !== figma.mixed) {
    for (const fill of node.fills) {
      if (fill.type === "SOLID") {
        const { color, opacity } = fill;
        const modifier: ForegorundTextModifier = {
          type: "foregroundColor",
          color: {
            type: "Color",
            red: color.r,
            green: color.g,
            blue: color.b,
            opacity: opacity,
          },
        };

        view.modifiers.push(modifier);
      }
    }
  }
}

/**
 Reference: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
 
 Swift Interface
 @frozen public struct Weight : Hashable {
    public static let ultraLight: Font.Weight
    public static let thin: Font.Weight
    public static let light: Font.Weight
    public static let regular: Font.Weight
    public static let medium: Font.Weight
    public static let semibold: Font.Weight
    public static let bold: Font.Weight
    public static let heavy: Font.Weight
    public static let black: Font.Weight
 }
*/

function mappedFontWeight(fontName: FontName): NamedFontWeight | null {
  const mapOfFigmaAndSwiftUIFontWeight: { [key: string]: NamedFontWeight } = {
    thin: "ultraLight",
    extralight: "thin",
    light: "light",
    regular: "regular",
    medium: "medium",
    semibold: "semibold",
    bold: "bold",
    extrabold: "heavy",
    heavy: "heavy",
    black: "black",
  };
  return mapOfFigmaAndSwiftUIFontWeight[fontName.style];
}
