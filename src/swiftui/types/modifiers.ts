import { Color } from "./views";

export interface Modifier {
  readonly name: string;
}

export interface FrameModifier extends Modifier {
  readonly name: "frame";
  width?: number;
  height?: number;
  maxWidth?: "infinity";
  maxHeight?: "infinity";
}

export interface PaddingModifier extends Modifier {
  readonly name: "padding";

  top?: number;
  leading?: number;
  bottom?: number;
  trailing?: number;
}

export interface BackgroundModifier extends Modifier {
  readonly name: "background";
  view: Color;
}