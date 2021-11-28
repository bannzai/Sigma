import { Color } from "./views";

export interface TextModifier {
  name: string;
}

export interface UnderlineTextModifier extends TextModifier {
  name: "underline";
}

export interface StrikethroughTextModifier extends TextModifier {
  name: "strikethrough";
}

export type NamedFontWeight =
  | "ultraLight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "heavy"
  | "black";
export interface FontWeightTextModifier extends TextModifier {
  name: "fontWeight";

  fontWeight: NamedFontWeight;
}

export interface FontTextModifier extends TextModifier {
  name: "font";

  namedType: "system";
  size?: number;
}

export interface ForegorundTextModifier extends TextModifier {
  name: "foregroundColor";

  color: Color;
}
