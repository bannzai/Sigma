import { AppView } from "../types/app";
import { BuildContext } from "./context";

export function buildApp(context: BuildContext, view: AppView) {
  context.add(`${view.name}()`);
}
