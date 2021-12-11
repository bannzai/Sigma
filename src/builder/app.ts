import { trace } from "./tracer";
import { BuildContext } from "./context";
import { AppView } from "../types/app";

export function buildApp(context: BuildContext, view: AppView) {
  trace("#buildApp", context, view);
  context.add(`${view.appViewInfo.appComponentName}()`);
}
