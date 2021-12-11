const assert = require("assert");
import { isAppView } from "../types/app";
import { isSwiftUIImageModifier } from "../types/imageModifier";
import { isSwiftUIModifier, Modifier } from "../types/modifiers";
import { isSwiftUIViewShape } from "../types/shape";
import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { isSwiftUITextModifier } from "../types/textModifier";
import { isSwiftUIViewType, View } from "../types/views";
import { buildApp } from "./app";
import { BuildContext } from "./context";
import { buildImageModifier } from "./imageModifier";
import { buildModifier } from "./modifier";
import { buildShape } from "./shape";
import { buildShapeModifier } from "./shapeModifier";
import { buildTextModifier } from "./textModifier";
import { trace } from "./tracer";
import { buildView } from "./view";

export function build(buildContext: BuildContext) {
  const { current: view } = buildContext;
  trace("#build", buildContext, view);

  if (
    buildContext.option != null &&
    buildContext.option.isGenerateOnlyView != null &&
    buildContext.option.isGenerateOnlyView
  ) {
    buildBody(buildContext, view);
  } else {
    const name = view.appViewInfo?.appComponentName ?? "ContentView";
    buildContext.add(`public struct ${name}: View {`);
    buildContext.nest();
    buildContext.add(`public var body: some View {`);
    buildContext.nest();
    buildBody(buildContext, view);
    buildContext.unnest();
    buildContext.add(`}`);
    buildContext.unnest();
    buildContext.add(`}`);
  }
}

export function buildBody(context: BuildContext, view: View | Modifier) {
  trace("#buildBody", context, view);

  if (isAppView(view) && context.current.node?.id !== view.node?.id) {
    buildApp(context, view);
  } else if (isSwiftUIViewType(view)) {
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
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
