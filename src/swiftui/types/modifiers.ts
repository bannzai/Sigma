import { Color, Shape, View } from "./views";

export interface Modifier {
  readonly type: string;
}

export interface FrameModifier extends Modifier {
  readonly type: "frame";
  width?: number;
  height?: number;
  maxWidth?: "infinity";
  maxHeight?: "infinity";
}

export interface PaddingModifier extends Modifier {
  readonly type: "padding";

  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface BackgroundModifier extends Modifier {
  readonly type: "background";
  view: Color;
}

// TODO: Rename to BorderModifierContainer and build from BorderModifierContainer to .overlay(_:lineWidth:)
export interface OverlayModifier extends Modifier {
  readonly type: "overlay";
  shape: View & Shape;
  lineWidth: number;
}

export interface StrokeModifier extends Modifier {
  type: "stroke";
  color: Color;
}

export interface ClipShapeModifier extends Modifier {
  type: "clipShape";
  // TOOD: Replace to Shape
  shapeNode: BlendMixin & SceneNode;
}

export interface MaskModifier extends Modifier {
  type: "mask";
  // TOOD: Replace to Shape
  shapeNode: BlendMixin & SceneNode;
}

export interface CornerRadiusModifier extends Modifier {
  type: "cornerRadius";
  cornerRadius: number;
}

export interface PositionModifier extends Modifier {
  type: "position";
  x: number;
  y: number;
}
