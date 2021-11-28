import { Modifier } from "./modifiers";
import { TextModifier } from "./textModifier";

export interface View {
  readonly name: string;
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
  readonly name: "VStack";
  readonly axis: "V";

  alignment: "leading" | "center" | "trailing";
  spacing: number;
}

export interface HStack extends View, ChildrenMixin, AxisMixin {
  readonly name: "HStack";
  readonly axis: "H";

  alignment: "top" | "center" | "bottom";
  spacing: number;
}

export interface ZStack extends View, ChildrenMixin, AxisMixin {
  readonly name: "ZStack";
  readonly axis: "Z";
}

export interface Button extends View, ChildrenMixin {
  readonly name: "Button";
}

export interface Text extends View {
  readonly name: "Text";
  modifiers: (Modifier | TextModifier)[];

  readonly text: string;
  readonly multipleLineSyntax: boolean;
}

export interface Spacer extends View {
  readonly name: "Spacer";
}

export interface Color {
  readonly name: "Color";

  red: number;
  green: number;
  blue: number;
  opacity?: number;
}

export interface Shape {}

export interface Rectangle extends View, Shape {
  readonly name: "Rectangle";
}

export interface RoundedRectangle extends View, Shape {
  readonly name: "RoundedRectangle";

  readonly cornerRadius: number;
}
