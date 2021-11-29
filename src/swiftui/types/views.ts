import { ImageModifier } from "./imageModifier";
import { Modifier } from "./modifiers";
import { TextModifier } from "./textModifier";

export interface View {
  readonly type: string;
  modifiers: Modifier[];
  readonly parent: (View & ChildrenMixin) | null;

  readonly node: SceneNode | null;
}

export interface ChildrenMixin {
  children: View[];
}

export type Axis = "V" | "H" | "Z";
export interface AxisMixin {
  readonly axis: Axis;
}
export const isAxisView = (args: any): args is AxisMixin => "axis" in args;

export interface VStack extends View, ChildrenMixin, AxisMixin {
  readonly type: "VStack";
  readonly axis: "V";

  alignment: "leading" | "center" | "trailing";
  spacing: number;
}

export interface HStack extends View, ChildrenMixin, AxisMixin {
  readonly type: "HStack";
  readonly axis: "H";

  alignment: "top" | "center" | "bottom";
  spacing: number;
}

export interface ZStack extends View, ChildrenMixin, AxisMixin {
  readonly type: "ZStack";
  readonly axis: "Z";
}

export interface Button extends View, ChildrenMixin {
  readonly type: "Button";
}

export interface Text extends View {
  readonly type: "Text";
  modifiers: (Modifier | TextModifier)[];

  readonly text: string;
  readonly multipleLineSyntax: boolean;
}

export interface Spacer extends View {
  readonly type: "Spacer";
}

export interface Color {
  readonly type: "Color";

  red: number;
  green: number;
  blue: number;
  opacity?: number;
}

export interface Shape {}

export interface Rectangle extends View, Shape {
  readonly type: "Rectangle";
}

export interface RoundedRectangle extends View, Shape {
  readonly type: "RoundedRectangle";

  readonly cornerRadius: number;
}

export interface Ellipse extends View, Shape {
  readonly type: "Ellipse";
}

export interface Image extends View {
  readonly type: "Image";
  modifiers: (Modifier | ImageModifier)[];

  name: string;
}

export interface Divier extends View {
  readonly type: "Divider";
}
