import { AppView, AppViewInfo } from "../types/app";
import { ImageModifier } from "../types/imageModifier";
import { Modifier } from "../types/modifiers";
import { ShapeModifier } from "../types/shapeModifier";
import { TextModifier } from "../types/textModifier";
import { View } from "../types/views";
import { BuildContext } from "./context";

export function trace(
  prefix: string = "",
  context: BuildContext,
  view: { type: string }
) {
  const { type } = view;
  console.log(`${prefix} ${JSON.stringify({ type })}`);
}
