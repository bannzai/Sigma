import { SwiftUIViewType } from "../types/views";
import { BuildContext } from "./context";
import { walk } from "./entrypoint";
import { walkToText } from "./text";

export function walkToView(context: BuildContext, view: SwiftUIViewType) {
  if (view.type === "VStack") {
    context.add(
      `VStack(alignment: ${view.alignment}, spacing: ${view.spacing}) {`
    );
    context.nest();
    view.children.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "HStack") {
    context.add(
      `HStack(alignment: ${view.alignment}, spacing: ${view.spacing}) {`
    );
    context.nest();
    view.children.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "ZStack") {
    context.add(`ZStack {`);
    context.nest();
    view.children.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "Button") {
  } else if (view.type === "Color") {
  } else if (view.type === "Image") {
  } else if (view.type === "Text") {
    walkToText(context, view);
  } else if (view.type === "Divider") {
  } else if (view.type === "Spacer") {
  } else {
    const _: never = view;
  }
}
