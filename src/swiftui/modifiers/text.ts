import { mappedSwiftUIColor } from "../../util/mapper";
import { SwiftUIContext } from "../context";

export function walkForTextModifier(context: SwiftUIContext, node: TextNode) {
  context.nest();

  if (node.textDecoration === "UNDERLINE") {
    context.lineBreak();
    context.add(".underline()");
  } else if (node.textDecoration === "STRIKETHROUGH") {
    context.lineBreak();
    context.add(".strikethrough()");
  }

  // NOTE: Sigma only supports single font member on Text
  if (node.fontName !== figma.mixed && node.fontSize !== figma.mixed) {
    const fontWeight = mappedFontWeight(node.fontName);
    if (fontWeight != null) {
      context.lineBreak();
      context.add(`.fontWeight(.${fontWeight})`);
    }

    const fontSize = node.fontSize;
    context.lineBreak();
    context.add(`.font(.system(size: ${fontSize}))`);

    // TOOD: Mapping to SwiftUI FontFamily
    // const fontFamily = node.fontName.family;
    // console.log(JSON.stringify({ fontFamily, fontSize }));
  }

  if (node.fills !== figma.mixed) {
    for (const fill of node.fills) {
      if (fill.type === "SOLID") {
        const { color, opacity } = fill;
        context.lineBreak();
        context.add(
          `.foregroundColor(${mappedSwiftUIColor(color, opacity)})\n`
        );
      }
    }
  }

  context.unnest();
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

function mappedFontWeight(fontName: FontName): string | null {
  const mapOfFigmaAndSwiftUIFontWeight: { [key: string]: string } = {
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
