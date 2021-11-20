import { SwiftUIContext } from "../context";

export function adaptTextModifier(context: SwiftUIContext, node: TextNode) {
  context.nest();

  if (node.textDecoration === "UNDERLINE") {
    context.add("\n.underline()");
  } else if (node.textDecoration === "STRIKETHROUGH") {
    context.add("\n.strikethrough()");
  }

  // NOTE: Sigma only supports single font member on Text
  if (node.fontName !== figma.mixed && node.fontSize !== figma.mixed) {
    const fontWeight = mappedFontWeight(node.fontName);
    if (fontWeight != null) {
      context.add(`\n.fontWeight(.${fontWeight})`);
    }

    const fontSize = node.fontSize;
    context.add(`\n.font(.system(size: ${fontWeight}))`);

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

function mappedFontWeight(fontName: FontName): string | null {
  const mapOffigmaAndSwiftUIFontWeight: { [key: string]: string } = {
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
  return mapOffigmaAndSwiftUIFontWeight[fontName.style];
}