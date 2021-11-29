import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { SwiftUIViewShape } from "../types/shape";
import { BuildContext } from "./context";
import { walkToModifier } from "./modifier";
import { walkToShapeModifier } from "./shapeModifier";

export function walkToShape(context: BuildContext, shape: SwiftUIViewShape) {
  if (shape.type === "Rectangle") {
    context.add(`Rectangle()`);
    context.nest();
    shape.modifiers.forEach((e) => {
      if (isSwiftUIViewShapeModifier(e)) {
        walkToShapeModifier(context, e);
      } else {
        walkToModifier(context, e);
      }
    });
    context.unnest();
  } else if (shape.type === "RoundedRectangle") {
    context.add(`RoundedRectangle(cornerRadius: ${shape.cornerRadius})`);
    context.nest();
    shape.modifiers.forEach((e) => {
      if (isSwiftUIViewShapeModifier(e)) {
        walkToShapeModifier(context, e);
      } else {
        walkToModifier(context, e);
      }
    });
    context.unnest();
  } else if (shape.type === "Ellipse") {
    context.add(`Ellipse()`);
    context.nest();
    shape.modifiers.forEach((e) => {
      if (isSwiftUIViewShapeModifier(e)) {
        walkToShapeModifier(context, e);
      } else {
        walkToModifier(context, e);
      }
    });
    context.unnest();
  } else {
    const _: never = shape;
  }
}
