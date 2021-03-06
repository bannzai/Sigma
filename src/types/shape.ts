import { SwiftUIViewModifier } from "./modifiers";
import { SwiftUIViewShapeModifier } from "./shapeModifier";
import { View } from "./views";

const swiftUIShapeType = ["Rectangle", "RoundedRectangle", "Ellipse"] as const;
export type SwiftUIViewShape = Rectangle | RoundedRectangle | Ellipse;
export function isSwiftUIViewShape(args: {
  type: string;
}): args is SwiftUIViewShape {
  return (swiftUIShapeType as Readonly<string[]>).includes(args.type);
}
export interface Shape extends View {
  readonly type: typeof swiftUIShapeType[number];
  modifiers: (SwiftUIViewModifier | SwiftUIViewShapeModifier)[];
  readonly node: SceneNode | null;
}

export interface Rectangle extends Shape {
  readonly type: "Rectangle";
}

export interface RoundedRectangle extends Shape {
  readonly type: "RoundedRectangle";

  readonly cornerRadius: number;
}

export interface Ellipse extends Shape {
  readonly type: "Ellipse";
}
