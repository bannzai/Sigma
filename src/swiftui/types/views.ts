import { Modifier } from "./modifiers";

export interface View {
  readonly name: string;
  modifiers: Modifier[];
}

interface ChildrenMixin {
  children: View[];
}

interface AxisMixin {
  readonly axis: "V" | "H" | "Z";
}

export interface VStack extends View, ChildrenMixin, AxisMixin {
  readonly name: "VStack";
  readonly axis: "V";
}

export interface HStack extends View, ChildrenMixin, AxisMixin {
  readonly name: "HStack";
  readonly axis: "H";
}

export interface ZStack extends View, ChildrenMixin, AxisMixin {
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
