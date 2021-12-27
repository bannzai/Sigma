import { isAppView } from "../types/app";
import { isSwiftUIButtonModifier } from "../types/buttonModifier";
import { isSwiftUIImageModifier } from "../types/imageModifier";
import { isSwiftUIModifier, Modifier } from "../types/modifiers";
import { isSwiftUIViewShape } from "../types/shape";
import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { isSwiftUITextModifier } from "../types/textModifier";
import { isSwiftUIViewType, View } from "../types/views";
import { assert } from "../util/foundation";
import { buildApp } from "./app";
import { buildButtonModifier } from "./buttonModifier";
import { BuildContext } from "./context";
import { buildImageModifier } from "./imageModifier";
import { buildModifier } from "./modifier";
import { buildShape } from "./shape";
import { buildShapeModifier } from "./shapeModifier";
import { buildTextModifier } from "./textModifier";
import { trace } from "./tracer";
import { buildView } from "./view";

export function build(context: BuildContext) {
  const { current: view } = context;
  trace("#build", context, view);

  if (
    context.option != null &&
    context.option.isGenerateOnlyView != null &&
    context.option.isGenerateOnlyView
  ) {
    buildBody(context, view);
  } else {
    const name = view.appViewInfo?.appComponentName ?? "ContentView";
    context.add(`public struct ${name}: View {`);
    context.nestBlock(() => {
      context.add(`public var body: some View {`);
      context.nestBlock(() => {
        buildBody(context, view);
      });
      context.add(`}`);
    });
    context.add(`}`);
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
  } else if (isSwiftUIButtonModifier(view)) {
    buildButtonModifier(context, view);
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
