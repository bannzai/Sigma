import { Modifier } from "./modifiers";
import { Color } from "./views";

export type SwiftUIViewShapeModifier = StrokeModifier;
export const shapeModifiers = ["stroke"];
export function isSwiftUIViewShapeModifier(
  args: Modifier | SwiftUIViewShapeModifier
): args is SwiftUIViewShapeModifier {
  return shapeModifiers.includes(args.type);
}

export interface ShapeModifier {
  readonly type: string;
}

export interface StrokeModifier extends ShapeModifier {
  readonly type: "stroke";
  color: Color;
  lineWidth: number;
}
