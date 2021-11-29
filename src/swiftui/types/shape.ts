import { SwiftUIViewModifier } from "./modifiers";
import { SwiftUIViewShapeModifier } from "./shapeModifier";
import { View, ChildrenMixin } from "./views";

export interface Shape {
  readonly type: string;
  modifiers: (SwiftUIViewModifier | SwiftUIViewShapeModifier)[];
  readonly parent: (View & ChildrenMixin) | null;
  readonly node: SceneNode | null;
}
export type SwiftUIViewShape = Rectangle | RoundedRectangle | Ellipse;

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
