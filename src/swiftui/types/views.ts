import { ImageModifier } from "./imageModifier";
import { Modifier, SwiftUIViewModifier } from "./modifiers";
import { SwiftUITextModifier, TextModifier } from "./textModifier";
import { ShapeModifier, SwiftUIViewShapeModifier } from "./shapeModifier";
import { Shape } from "./shape";

export type SwiftUIViewType =
  | VStack
  | HStack
  | ZStack
  | Button
  | Text
  | Color
  | Image
  | Spacer
  | Divider;

const swiftUIViewType = [
  "VStack",
  "HStack",
  "ZStack",
  "Button",
  "Text",
  "Color",
  "Image",
  "Spacer",
  "Divider",
] as const;
export function isSwiftUIViewType(args: {
  type: string;
}): args is SwiftUIViewType & View {
  return (swiftUIViewType as Readonly<string[]>).includes(args.type);
}
export interface View {
  readonly type: typeof swiftUIViewType[number];
  modifiers: { type: string }[];
  readonly parent: (View & ChildrenMixin) | null;

  readonly node: SceneNode | null;
}

export function isContainerType(args: any): args is View & ChildrenMixin {
  return (
    (args as ChildrenMixin).children !== undefined &&
    (args as View).type !== undefined &&
    swiftUIViewType.includes(args.type)
  );
}
export interface ChildrenMixin {
  children: (View | Shape)[];
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

export interface Image extends View {
  readonly type: "Image";

  name: string;
}

export interface Divider extends View {
  readonly type: "Divider";
}
