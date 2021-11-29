import { SwiftUIViewType } from "../types/views";
import { BuildContext } from "./context";
import { walkToText } from "./text";

export function walkToView(context: BuildContext, view: SwiftUIViewType) {
  if (view.type === "VStack") {
    context.add(
      `VStack(alignment: ${view.alignment}, spacing: ${view.spacing}) {`
    );
    view.children.forEach((e) => {});
  } else if (view.type === "HStack") {
  } else if (view.type === "ZStack") {
  } else if (view.type === "Button") {
  } else if (view.type === "Color") {
  } else if (view.type === "Image") {
  } else if (view.type === "Text") {
    walkToText(context, view);
  } else if (view.type === "Divider") {
  } else {
    const _: never = view;
  }
}
