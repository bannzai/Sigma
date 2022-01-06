import { AppViewInfo } from "./app";

export type SwiftUIViewType =
  | VStack
  | HStack
  | ZStack
  | LazyVGrid
  | LazyHGrid
  | Button
  | Text
  | TextField
  | Color
  | Image
  | AsyncImage
  | Spacer
  | Divider
  | Section;

const swiftUIViewType = [
  "VStack",
  "HStack",
  "ZStack",
  "LazyVGrid",
  "LazyHGrid",
  "Button",
  "Text",
  "TextField",
  "Color",
  "Image",
  "AsyncImage",
  "Spacer",
  "Divider",
  "Section",
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const isAxisView = (args: object): args is AxisMixin => "axis" in args;

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

export const isGridView = (args: {
  type: string;
}): args is LazyHGrid | LazyHGrid => {
  return args.type === "LazyVGrid" || args.type === "LazyHGrid";
};

export interface LazyVGrid extends PrimitiveView, ChildrenMixin, AxisMixin {
  readonly type: "LazyVGrid";
  readonly axis: "V";
  children: (Section | HStack)[];
  maximumGridItemCount: number;
}

export interface LazyHGrid extends PrimitiveView, ChildrenMixin, AxisMixin {
  readonly type: "LazyHGrid";
  readonly axis: "H";
  children: (Section | VStack)[];
  maximumGridItemCount: number;
}

export interface Button extends PrimitiveView, ChildrenMixin {
  readonly type: "Button";
}

export interface Text extends PrimitiveView {
  readonly type: "Text";

  readonly text: string;
  readonly multipleLineSyntax: boolean;
}

export interface TextField extends PrimitiveView, ChildrenMixin {
  readonly type: "TextField";

  text?: Text;
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

export interface Section extends PrimitiveView, ChildrenMixin {
  readonly type: "Section";

  header?: View;
  footer?: View;
}
