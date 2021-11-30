import * as assert from "assert";
import { isSwiftUIModifier, SwiftUIViewModifier } from "../types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../types/shape";
import {
  isSwiftUIViewShapeModifier,
  SwiftUIViewShapeModifier,
} from "../types/shapeModifier";
import {
  isSwiftUITextModifier,
  SwiftUITextModifier,
} from "../types/textModifier";
import { isSwiftUIViewType, SwiftUIViewType } from "../types/views";
import { BuildContext } from "./context";
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
  } else {
    assert(false, JSON.stringify({ view }));
  }
}