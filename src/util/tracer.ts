import { SwiftUIContext } from "../swiftui/context";

export function trace(
  prefix: string = "",
  context: SwiftUIContext,
  node: SceneNode
) {
  const { id, name, type } = node;
  const { indent } = context;
  console.log(`${prefix} ${JSON.stringify({ indent, id, name, type })}`);
}
