import { Modifier, SwiftUIViewModifier } from "./modifiers";
import { Color } from "./views";

export type SwiftUITextModifier =
  | UnderlineTextModifier
  | StrikethroughTextModifier
  | FontWeightTextModifier
  | FontTextModifier
  | ForegorundTextModifier;

const textModifierTypes = [
  "underline",
  "strikethrough",
  "fontWeight",
  "font",
  "foregroundColor",
] as const;
export function isSwiftUITextModifier(args: {
  type: string;
}): args is SwiftUITextModifier {
  return (textModifierTypes as Readonly<string[]>).includes(args.type);
}

export interface TextModifier {
  readonly type: typeof textModifierTypes[number];
}

export interface UnderlineTextModifier extends TextModifier {
  readonly type: "underline";
}

export interface StrikethroughTextModifier extends TextModifier {
  readonly type: "strikethrough";
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
  readonly type: "fontWeight";

  fontWeight: NamedFontWeight;
}

export interface FontTextModifier extends TextModifier {
  readonly type: "font";

  namedType: "system";
  size?: number;
}

export interface ForegorundTextModifier extends TextModifier {
  readonly type: "foregroundColor";

  color: Color;
}
