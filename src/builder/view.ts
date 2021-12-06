import { isContainerType, SwiftUIViewType, View } from "../types/views";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";
import { walk } from "./entrypoint";

export function walkToView(
  context: BuildContext,
  view: SwiftUIViewType & View
) {
  if (view.type === "VStack") {
    context.add(
      `VStack(alignment: .${view.alignment}, spacing: ${view.spacing}) {`
    );
    context.nest();
    view.children.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "HStack") {
    context.add(
      `HStack(alignment: .${view.alignment}, spacing: ${view.spacing}) {`
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
    context.add(`Button(action: { /* TODO */ }) {`);
    context.nest();
    view.children.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "Color") {
    context.add(`${mappedSwiftUIColor(view)}`);
  } else if (view.type === "Image") {
    if (view.name != null) {
      context.add(`Image("${view.name}")`);
    } else if (view.systemName != null) {
      context.add(`Image("${view.systemName}")`);
    }
  } else if (view.type === "Text") {
    context.add(`Text("${view.text}")`);
  } else if (view.type === "Divider") {
    context.add(`Divider()`);
  } else if (view.type === "Spacer") {
    context.add(`Spacer()`);
  } else {
    const _: never = view;
  }

  if (isContainerType(view)) {
    view.modifiers.forEach((e) => {
      walk(context, e);
    });
  } else {
    context.nest();
    view.modifiers.forEach((e) => {
      walk(context, e);
    });
    context.unnest();
  }
}
