import { FigmaContext } from "./context";

export function trace(
  prefix: string = "",
  context: FigmaContext,
  node: SceneNode,
  additional?: object
) {
  const { id, name, type } = node;
  if (additional == null) {
    console.log(`${prefix} ${JSON.stringify({ id, name, type })}`);
  } else {
    console.log(`${prefix} ${JSON.stringify({ id, name, type, additional })}`);
  }
}
