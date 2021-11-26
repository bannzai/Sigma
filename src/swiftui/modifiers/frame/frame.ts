import * as assert from "assert";
import { SwiftUIContext } from "../../context";
import { build } from "./build";

export function adaptFrameModifierWithFrameNode(
  context: SwiftUIContext,
  node: FrameNode
) {
  /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
  assert(node.layoutAlign !== "MIN");
  assert(node.layoutAlign !== "MAX");
  assert(node.layoutAlign !== "CENTER");

  context.lineBreak();

  const { fixedWidth, maxWidth, fixedHeight, maxHeight, alignment } = build(
    context,
    node
  );

  var maximumFrameArgs: string[] = [];
  if (maxWidth != null) {
    maximumFrameArgs.push(`maxWidth: ${maxWidth.width}`);
  }
  if (maxHeight != null) {
    maximumFrameArgs.push(`maxHeight: ${maxHeight.height}`);
  }
  if (maximumFrameArgs.length > 0) {
    if (alignment !== "center") {
      maximumFrameArgs.push(`alignment: .${alignment}`);
    }

    const args = maximumFrameArgs.join(", ");
    context.add(`.frame(${args})\n`);
  }

  var fixedFrameArgs: string[] = [];
  if (fixedWidth != null) {
    fixedFrameArgs.push(`width: ${fixedWidth.width}`);
  }
  if (fixedHeight != null) {
    fixedFrameArgs.push(`height: ${fixedHeight.height}`);
  }
  if (fixedFrameArgs.length > 0) {
    if (alignment !== "center") {
      maximumFrameArgs.push(`alignment: .${alignment}`);
    }

    const args = fixedFrameArgs.join(", ");
    context.add(`.frame(${args})\n`);
  }

  context.lineBreak();
}

export function walkForFixedFrame(
  context: SwiftUIContext,
  node: LayoutMixin & BaseNode
) {
  const { name, width, height, layoutAlign } = node;
  console.log(JSON.stringify({ name, width, height, layoutAlign }));

  /*
    NOTE: ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children.
    Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. 
    This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.

    Document: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
   */
  assert(layoutAlign !== "MIN");
  assert(layoutAlign !== "MAX");
  assert(layoutAlign !== "CENTER");

  if (layoutAlign === "INHERIT") {
    context.lineBreak();
    context.nest();
    context.add(`.frame(width: ${width}, height: ${height})`);
    context.unnest();
  } else if (layoutAlign === "STRETCH") {
    assert(false, "unknown pattern");
  } else {
    const _: never = layoutAlign;
  }
}
