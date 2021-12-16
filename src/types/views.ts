import { AppViewInfo } from "./app";

export type SwiftUIViewType =
  | VStack
  | HStack
  | ZStack
  | Button
  | Text
  | Color
  | Image
  | AsyncImage
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
  "AsyncImage",
  "Spacer",
  "Divider",
] as const;
export function isSwiftUIViewType(args: {
  type: string;
}): args is SwiftUIViewType & View {
  return (swiftUIViewType as Readonly<string[]>).includes(args.type);
}
export interface View {
  readonly type: string;
  modifiers: { type: string }[];
  appViewInfo?: AppViewInfo;

  node: SceneNode | null;
}
export interface PrimitiveView extends View {
  readonly type: typeof swiftUIViewType[number];
}

export function isContainerType(
  args: any
): args is PrimitiveView & ChildrenMixin {
  return (args as ChildrenMixin).children !== undefined;
}
export interface ChildrenMixin {
  children: View[];
}

export type Axis = "V" | "H" | "Z";
export interface AxisMixin {
  readonly axis: Axis;
}
export const isAxisView = (args: any): args is AxisMixin => "axis" in args;

export interface VStack extends PrimitiveView, ChildrenMixin, AxisMixin {
  readonly type: "VStack";
  readonly axis: "V";

  alignment: "leading" | "center" | "trailing";
  spacing: number;
}

export interface HStack extends PrimitiveView, ChildrenMixin, AxisMixin {
  readonly type: "HStack";
  readonly axis: "H";

  alignment: "top" | "center" | "bottom";
  spacing: number;
}

export interface ZStack extends PrimitiveView, ChildrenMixin, AxisMixin {
  readonly type: "ZStack";
  readonly axis: "Z";
}

export interface Button extends PrimitiveView, ChildrenMixin {
  readonly type: "Button";
}

export interface Text extends PrimitiveView {
  readonly type: "Text";

  readonly text: string;
  readonly multipleLineSyntax: boolean;
}

export interface Spacer extends PrimitiveView {
  readonly type: "Spacer";
}

export interface Color {
  readonly type: "Color";

  red: number;
  green: number;
  blue: number;
  opacity?: number;
}

export interface Image extends PrimitiveView {
  readonly type: "Image";

  name?: string;
  systemName?: string;
  isAsyncImage?: boolean;
}

export interface AsyncImage extends PrimitiveView {
  readonly type: "AsyncImage";

  image: Image;
}

export interface Divider extends PrimitiveView {
  readonly type: "Divider";
}
