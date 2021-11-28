import { Color, Shape, View } from "./views";

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

// TODO: Rename to BorderModifierContainer and build from BorderModifierContainer to .overlay(_:lineWidth:)
export interface OverlayModifier extends Modifier {
  readonly name: "overlay";
  shape: View & Shape;
  lineWidth: number;
}

export interface StrokeModifier extends Modifier {
  name: "stroke";
  color: Color;
}

export interface ClipShapeModifier extends Modifier {
  name: "clipShape";
  // TOOD: Replace to Shape
  shapeNode: BlendMixin & SceneNode;
}
