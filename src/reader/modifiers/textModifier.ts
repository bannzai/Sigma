import { FigmaContext } from "../context";
import { Text, TextField } from "../../types/views";
import {
  FontTextModifier,
  FontWeightTextModifier,
  NamedFontWeight,
} from "../../types/textModifier";

export function appendTextModifier(
  _context: FigmaContext,
  node: TextNode,
  text: Text | TextField
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

    // Apple Standard Font: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
    const appleFonts = [
      "San Francisco",
      "SF Pro",
      "SF Pro Rounded",
      "SF Mono",
      "SF Compact",
      "SF Compact Rounded",
    ];
    const { family } = node.fontName;
    if (appleFonts.includes(family)) {
      const modifier: FontTextModifier = {
        type: "font",
        system: "system",
        size: node.fontSize,
      };
      text.modifiers.push(modifier);
    } else {
      const modifier: FontTextModifier = {
        type: "font",
        family: family,
        size: node.fontSize,
      };
      text.modifiers.push(modifier);
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
