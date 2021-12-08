import { SwiftUIViewShape } from "../types/shape";
import { BuildContext } from "./context";
import { build } from "./entrypoint";

export function buildShape(context: BuildContext, shape: SwiftUIViewShape) {
  if (shape.type === "Rectangle") {
    context.add(`Rectangle()`);
    context.nest();
    shape.modifiers.forEach((e) => {
      build(context, e);
    });
    context.unnest();
  } else if (shape.type === "RoundedRectangle") {
    context.add(`RoundedRectangle(cornerRadius: ${shape.cornerRadius})`);
    context.nest();
    shape.modifiers.forEach((e) => {
      build(context, e);
    });
    context.unnest();
  } else if (shape.type === "Ellipse") {
    context.add(`Ellipse()`);
    context.nest();
    shape.modifiers.forEach((e) => {
      build(context, e);
    });
    context.unnest();
  } else {
    const _: never = shape;
  }
}
