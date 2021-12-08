const assert = require("assert");
import { isSwiftUIImageModifier } from "../types/imageModifier";
import { isSwiftUIModifier, SwiftUIViewModifier } from "../types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../types/shape";
import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { isSwiftUITextModifier } from "../types/textModifier";
import { isSwiftUIViewType, SwiftUIViewType } from "../types/views";
import { BuildContext } from "./context";
import { walkToImageModifier } from "./imageModifier";
import { walkToModifier } from "./modifier";
import { walkToShape } from "./shape";
import { buildShapeModifier } from "./shapeModifier";
import { buildTextModifier } from "./textModifier";
import { buildView } from "./view";

export function walk(context: BuildContext, view: { type: string }) {
  if (isSwiftUIViewType(view)) {
    buildView(context, view);
  } else if (isSwiftUIViewShape(view)) {
    walkToShape(context, view);
  } else if (isSwiftUIModifier(view)) {
    walkToModifier(context, view);
  } else if (isSwiftUITextModifier(view)) {
    buildTextModifier(context, view);
  } else if (isSwiftUIViewShapeModifier(view)) {
    buildShapeModifier(context, view);
  } else if (isSwiftUIImageModifier(view)) {
    walkToImageModifier(context, view);
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
