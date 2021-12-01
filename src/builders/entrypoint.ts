const assert = require("assert");
import { isSwiftUIImageModifier } from "../swiftui/types/imageModifier";
import { isSwiftUIModifier, SwiftUIViewModifier } from "../swiftui/types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../swiftui/types/shape";
import {
  isSwiftUIViewShapeModifier,
  SwiftUIViewShapeModifier,
} from "../swiftui/types/shapeModifier";
import {
  isSwiftUITextModifier,
  SwiftUITextModifier,
} from "../swiftui/types/textModifier";
import { isSwiftUIViewType, SwiftUIViewType } from "../swiftui/types/views";
import { BuildContext } from "./context";
import { walkToImageModifier } from "./imageModifier";
import { walkToModifier } from "./modifier";
import { walkToShape } from "./shape";
import { walkToShapeModifier } from "./shapeModifier";
import { walkToTextModifier } from "./textModifier";
import { walkToView } from "./view";

export function walk(context: BuildContext, view: { type: string }) {
  if (isSwiftUIViewType(view)) {
    walkToView(context, view);
  } else if (isSwiftUIViewShape(view)) {
    walkToShape(context, view);
  } else if (isSwiftUIModifier(view)) {
    walkToModifier(context, view);
  } else if (isSwiftUITextModifier(view)) {
    walkToTextModifier(context, view);
  } else if (isSwiftUIViewShapeModifier(view)) {
    walkToShapeModifier(context, view);
  } else if (isSwiftUIImageModifier(view)) {
    walkToImageModifier(context, view);
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
