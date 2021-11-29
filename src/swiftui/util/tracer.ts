import { SwiftUIContext } from "../context";

export function trace(
  prefix: string = "",
  context: SwiftUIContext,
  node: SceneNode
) {
  const { id, name, type } = node;
  console.log(`${prefix} ${JSON.stringify({ id, name, type })}`);
}
