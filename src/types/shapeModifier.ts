import { Color } from "./views";

export type SwiftUIViewShapeModifier = StrokeModifier;
export const shapeModifiers = ["stroke"] as const;
export function isSwiftUIViewShapeModifier(args: {
  type: string;
}): args is SwiftUIViewShapeModifier {
  return (shapeModifiers as Readonly<string[]>).includes(args.type);
}

export interface ShapeModifier {
  readonly type: typeof shapeModifiers[number];
}

export interface StrokeModifier extends ShapeModifier {
  readonly type: "stroke";
  color: Color;
  lineWidth: number;
}
