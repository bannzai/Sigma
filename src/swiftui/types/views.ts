import { Modifier } from "./modifiers";

export interface View {
  readonly name: string;
  modifiers: Modifier[];
}

export interface ChildrenMixin {
  children: View[];
}

export type Axis = "V" | "H" | "Z";
export interface AxisMixin {
  readonly axis: Axis;
}

export interface ContainerMixin extends ChildrenMixin, AxisMixin {}

export interface VStack extends View, ContainerMixin {
  readonly name: "VStack";
  readonly axis: "V";
}

export interface HStack extends View, ContainerMixin {
  readonly name: "HStack";
  readonly axis: "H";
}

export interface ZStack extends View, ContainerMixin {
  readonly name: "ZStack";
  readonly axis: "Z";
}

export interface Button extends View, ChildrenMixin {
  readonly name: "Button";
}

export interface Text {
  readonly name: "Text";

  readonly text: string;
}

export interface Color {
  readonly name: "Color";

  red: number;
  green: number;
  blue: number;
}
