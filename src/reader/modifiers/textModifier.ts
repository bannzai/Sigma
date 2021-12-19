import { FigmaContext } from "../context";
import { Text } from "../../types/views";
import {
  FontTextModifier,
  FontWeightTextModifier,
  NamedFontWeight,
} from "../../types/textModifier";

export function walkForTextModifier(
  _context: FigmaContext,
  node: TextNode,
  text: Text
) {
  if (node.textDecoration === "UNDERLINE") {
    text.modifiers.push({ type: "underline" });
  } else if (node.textDecoration === "STRIKETHROUGH") {
    text.modifiers.push({ type: "strikethrough" });
  }

  // NOTE: Sigma only supports single font member on Text
  if (node.fontName !== figma.mixed && node.fontSize !== figma.mixed) {
    const fontWeight = mappedFontWeight(node.fontName);
    if (fontWeight != null) {
      const modifier: FontWeightTextModifier = {
        type: "fontWeight",
        fontWeight: fontWeight,
      };
      text.modifiers.push(modifier);
    }

    const modifier: FontTextModifier = {
      type: "font",
      namedType: "system",
      size: node.fontSize,
    };
    text.modifiers.push(modifier);

    // TOOD: Mapping to SwiftUI FontFamily
    // const fontFamily = node.fontName.family;
    // console.log(JSON.stringify({ fontFamily, fontSize }));
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
