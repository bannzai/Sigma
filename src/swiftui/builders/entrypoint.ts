import { isSwiftUIModifier, SwiftUIViewModifier } from "../types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../types/shape";
import { SwiftUIViewShapeModifier } from "../types/shapeModifier";
import { SwiftUITextModifier } from "../types/textModifier";
import { SwiftUIViewType } from "../types/views";
import { BuildContext } from "./context";
import { walkToShape } from "./shape";

export function walk(
  context: BuildContext,
  view:
    | SwiftUIViewType
    | SwiftUIViewShape
    | SwiftUIViewModifier
    | SwiftUITextModifier
    | SwiftUIViewShapeModifier
) {
  if (isSwiftUIViewShape(view)) {
    walkToShape(context, view);
  } else if (isSwiftUIModifier(view)) {
  }
}
