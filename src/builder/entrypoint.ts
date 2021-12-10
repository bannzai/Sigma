const assert = require("assert");
import { FigmaContext } from "../reader/context";
import { isAppView } from "../types/app";
import { isSwiftUIImageModifier } from "../types/imageModifier";
import { isSwiftUIModifier, SwiftUIViewModifier } from "../types/modifiers";
import { isSwiftUIViewShape, SwiftUIViewShape } from "../types/shape";
import { isSwiftUIViewShapeModifier } from "../types/shapeModifier";
import { isSwiftUITextModifier } from "../types/textModifier";
import {
  isContainerType,
  isSwiftUIViewType,
  SwiftUIViewType,
  View,
} from "../types/views";
import { buildApp } from "./app";
import { BuildContext } from "./context";
import { buildImageModifier } from "./imageModifier";
import { buildModifier } from "./modifier";
import { buildShape } from "./shape";
import { buildShapeModifier } from "./shapeModifier";
import { buildTextModifier } from "./textModifier";
import { trace } from "./tracer";
import { buildView } from "./view";

export function build(
  buildContext: BuildContext,
  view: { type: string; node: SceneNode | null }
) {
  trace("#build", buildContext, view as View);

  if (isAppView(view)) {
    buildContext.add(`public struct ${view.name}: SwiftUI.View {`);
    buildContext.nest();
    buildContext.add(`public var body: some SwiftUI.View {`);

    view.children.forEach((child) => {
      buildContext.nest();
      buildBody(buildContext, child);
      buildContext.unnest();
    });

    view.modifiers.forEach((e) => {
      buildBody(buildContext, e);
    });

    buildContext.add(`}`);
    buildContext.unnest();
    buildContext.add(`}`);
  } else {
    buildContext.add(`public struct ContentView: SwiftUI.View {`);
    buildContext.nest();
    buildContext.add(`public var body: some SwiftUI.View {`);
    buildContext.nest();
    buildBody(buildContext, view);
    buildContext.unnest();
    buildContext.add(`}`);
    buildContext.unnest();
    buildContext.add(`}`);
  }
}

export function buildBody(context: BuildContext, view: { type: string }) {
  trace("#buildBody", context, view as View);

  if (isSwiftUIViewType(view)) {
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
  } else if (isAppView(view)) {
    buildApp(context, view);
  } else {
    const { type } = view;
    assert(false, JSON.stringify({ type }));
  }
}
