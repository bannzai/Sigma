import { View } from "../types/views";
import { BuildContext } from "./context";

export function trace(prefix: string = "", context: BuildContext, view: View) {
  const { type } = view;
  console.log(`${prefix} ${JSON.stringify({ type })}`);
}
