import * as assert from "assert";
import { mappedSwiftUIColor } from "../util/mapper";
import { SwiftUIContext } from "../context";

export function walkForCornerRadius(
  context: SwiftUIContext,
  node: CornerMixin & SceneNode
) {
  const { cornerRadius } = node;
  if (cornerRadius !== figma.mixed) {
    if (cornerRadius !== 0) {
      context.add(`.cornerRadius(${cornerRadius})\n`);
    }
  }
}
