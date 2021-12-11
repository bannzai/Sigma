import { Alignment } from "./frameModifierTypes";
import { Color } from "./views";
import { Shape, SwiftUIViewShape } from "./shape";

export type SwiftUIViewModifier =
  | FrameModifier
  | PaddingModifier
  | BackgroundModifier
  | OverlayModifier
  | ClipShapeModifier
  | MaskModifier
  | CornerRadiusModifier
  | PositionModifier;

const swiftUIModifierType = [
  "frame",
  "padding",
  "background",
  "overlay",
  "clipshape",
  "mask",
  "clipShape",
  "cornerRadius",
  "position",
] as const;
export interface Modifier {
  readonly type: string;
}
export function isSwiftUIModifier(args: {
  type: string;
}): args is SwiftUIViewModifier {
  return (swiftUIModifierType as Readonly<string[]>).includes(args.type);
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

  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface BackgroundModifier extends Modifier {
  readonly type: "background";
  view: Color;
}

// TODO: Rename to BorderModifierContainer and build from BorderModifierContainer to .overlay(_:lineWidth:)
export interface OverlayModifier extends Modifier {
  readonly type: "overlay";
  shape: SwiftUIViewShape;
}

export interface ClipShapeModifier extends Modifier {
  readonly type: "clipShape";

  shapeNode: Shape;
}

export interface MaskModifier extends Modifier {
  readonly type: "mask";

  shapeNode: Shape;
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
