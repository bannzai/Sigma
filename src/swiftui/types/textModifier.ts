import { Color } from "./views";

export interface TextModifier {
  type: string;
}

export interface UnderlineTextModifier extends TextModifier {
  type: "underline";
}

export interface StrikethroughTextModifier extends TextModifier {
  type: "strikethrough";
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
  type: "fontWeight";

  fontWeight: NamedFontWeight;
}

export interface FontTextModifier extends TextModifier {
  type: "font";

  namedType: "system";
  size?: number;
}

export interface ForegorundTextModifier extends TextModifier {
  type: "foregroundColor";

  color: Color;
}
