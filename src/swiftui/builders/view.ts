import { SwiftUIViewType, View } from "../types/views";
import { BuildContext } from "./context";
import { walkToText } from "./text";

export function walkToView(context: BuildContext, view: SwiftUIViewType) {
  if (view.type === "Text") {
    walkToText(context, view);
  }
}
