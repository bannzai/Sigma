export interface FixedWidth {
  label: "width";
  width: number;
}
export interface MaxWidth {
  label: "maxWidth";
  width: "infinity";
}
export interface FixedHeight {
  label: "height";
  height: number;
}
export interface MaxHeight {
  label: "maxHeight";
  height: "infinity";
}

export type FrameModifierSizingArgumentType =
  | FixedWidth
  | FixedHeight
  | MaxWidth
  | MaxHeight;

export type Alignment =
  | "leading"
  | "top"
  | "trailing"
  | "bottom"
  | "topLeading"
  | "topTrailing"
  | "bottomLeading"
  | "bottomTrailing"
  | "center";

export interface FrameModifierArgument {
  fixedWidth: FixedWidth | null;
  maxWidth: MaxWidth | null;
  fixedHeight: FixedHeight | null;
  maxHeight: MaxHeight | null;
  alignment: Alignment;
}
