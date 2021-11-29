import { Alignment } from "./frameModifierTypes";
import { Color, Shape, View } from "./views";

export type SwiftUIViewModifier =
  | FrameModifier
  | PaddingModifier
  | BackgroundModifier
  | OverlayModifier
  | StrokeModifier
  | ClipShapeModifier
  | MaskModifier
  | CornerRadiusModifier
  | PositionModifier;

export interface Modifier {
  readonly type: string;
}

export interface FrameModifier extends Modifier {
  readonly type: "frame";
  width?: number;
  height?: number;
  maxWidth?: "infinity";
  maxHeight?: "infinity";
  alignment: Alignment;
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
  readonly type: "stroke";
  color: Color;
}

export interface ClipShapeModifier extends Modifier {
  readonly type: "clipShape";
  // TOOD: Replace to Shape
  shapeNode: BlendMixin & SceneNode;
}

export interface MaskModifier extends Modifier {
  readonly type: "mask";
  // TOOD: Replace to Shape
  shapeNode: BlendMixin & SceneNode;
}

export interface CornerRadiusModifier extends Modifier {
  readonly type: "cornerRadius";
  cornerRadius: number;
}

export interface PositionModifier extends Modifier {
  readonly type: "position";
  x: number;
  y: number;
}
