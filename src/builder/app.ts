import { AppView } from "../types/app";
import { trace } from "./tracer";
import { BuildContext } from "./context";

export function buildApp(context: BuildContext, view: AppView) {
  trace("#buildApp", context, view);
  context.add(`${view.name}()`);
}
