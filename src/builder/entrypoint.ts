const assert = require("assert");
import { isAppView } from "../types/app";
import { isSwiftUIImageModifier } from "../types/imageModifier";
import { isSwiftUIModifier, SwiftUIViewModifier } from "../types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../types/shape";
import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { isSwiftUITextModifier } from "../types/textModifier";
import { isSwiftUIViewType, SwiftUIViewType } from "../types/views";
import { buildApp } from "./app";
import { BuildContext } from "./context";
import { buildImageModifier } from "./imageModifier";
import { buildModifier } from "./modifier";
import { buildShape } from "./shape";
import { buildShapeModifier } from "./shapeModifier";
import { buildTextModifier } from "./textModifier";
import { buildView } from "./view";

export function build(context: BuildContext, view: { type: string }) {
  if (isSwiftUIViewType(view)) {
    buildView(context, view);
  } else if (isSwiftUIViewShape(view)) {
    buildShape(context, view);
  } else if (isSwiftUIModifier(view)) {
    buildModifier(context, view);
  } else if (isSwiftUITextModifier(view)) {
    buildTextModifier(context, view);
  } else if (isSwiftUIViewShapeModifier(view)) {
    buildShapeModifier(context, view);
  } else if (isSwiftUIImageModifier(view)) {
    buildImageModifier(context, view);
  } else if (isAppView(view)) {
    buildApp(context, view);
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
