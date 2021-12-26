import { isContainerType, SwiftUIViewType, View } from "../types/views";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";
import { buildBody } from "./entrypoint";
import { trace } from "./tracer";

export function buildView(context: BuildContext, view: SwiftUIViewType & View) {
  trace("#buildView", context, view);

  if (view.type === "VStack") {
    context.add(
      `VStack(alignment: .${view.alignment}, spacing: ${view.spacing}) {`
    );
    context.nest();
    view.children.forEach((e) => {
      buildBody(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "HStack") {
    context.add(
      `HStack(alignment: .${view.alignment}, spacing: ${view.spacing}) {`
    );
    context.nest();
    view.children.forEach((e) => {
      buildBody(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "ZStack") {
    context.add(`ZStack {`);
    context.nest();
    view.children.forEach((e) => {
      buildBody(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "Button") {
    context.add(`Button(action: { /* TODO */ }) {`);
    context.nest();
    view.children.forEach((e) => {
      buildBody(context, e);
    });
    context.unnest();
    context.add("}");
  } else if (view.type === "Color") {
    context.add(`${mappedSwiftUIColor(view)}`);
  } else if (view.type === "Image") {
    if (view.isAsyncImage) {
      context.add(`image`);
    } else if (view.name != null) {
      context.add(`Image("${view.name}")`);
    } else if (view.systemName != null) {
      context.add(`Image(systemName: "${view.systemName}")`);
    }
  } else if (view.type === "AsyncImage") {
    context.add(
      `AsyncImage(url: URL(string: "https://repository-images.githubusercontent.com/429982010/ca1373c5-2232-44be-bcf1-f47ac1007754")!) { phase in`
    );
    context.nestBlock(() => {
      context.add("switch phase {");
      context.add("case .success(let image):");
      context.nestBlock(() => {
        buildView(context, view.image);
      });
      context.add("case _:");
      context.nestBlock(() => {
        context.add("ProgressView()");
      });
      context.add("}");
    });
    context.add("}");
  } else if (view.type === "Text") {
    context.add(`Text("${view.text}")`);
  } else if (view.type === "Divider") {
    context.add(`Divider()`);
  } else if (view.type === "Spacer") {
    context.add(`Spacer()`);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _: never = view;
  }

  if (isContainerType(view)) {
    view.modifiers.forEach((e) => {
      buildBody(context, e);
    });
  } else {
    context.nest();
    view.modifiers.forEach((e) => {
      buildBody(context, e);
    });
    context.unnest();
  }
}
