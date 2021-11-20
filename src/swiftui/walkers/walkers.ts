import * as assert from "assert";
import { SwiftUIContext } from "../context";

export function walk(context: SwiftUIContext, node: SceneNode) {
  context.nest();

  if (node.type === "BOOLEAN_OPERATION") {
    // NOTE: Skip
  } else if (node.type === "CODE_BLOCK") {
    // NOTE: Skip
  } else if (node.type === "COMPONENT") {
    walkToComponent(context, node);
  } else if (node.type === "COMPONENT_SET") {
    assert(!node.children.every((component) => component.type === "COMPONENT"));
    node.children.forEach((child) =>
      walkToComponent(context, child as ComponentNode)
    );
  } else if (node.type === "CONNECTOR") {
    // NOTE: Skip because it is figjam property
  } else if (node.type === "ELLIPSE") {
    walkToEllipse(context, node);
  } else if (node.type === "FRAME") {
    walkToFrame(context, node);
  } else if (node.type === "GROUP") {
    walkToGroup(context, node);
  } else if (node.type === "INSTANCE") {
    if (node.mainComponent != null) {
      walkToComponent(context, node.mainComponent);
    } else {
      // TODO: Fill placeholder
    }
  } else if (node.type === "LINE") {
    walkToLine(context, node);
  } else if (node.type === "POLYGON") {
    // TODO:
  } else if (node.type === "RECTANGLE") {
    walkToRectagnle(context, node);
  } else if (node.type === "SHAPE_WITH_TEXT") {
    walkToShapeWithText(context, node);
  } else if (node.type === "SLICE") {
    // NOTE: Skip
  } else if (node.type === "STAMP") {
    // NOTE: Skip
  } else if (node.type === "STAR") {
    // TODO:
  } else if (node.type === "STICKY") {
    // NOTE: Skip
  } else if (node.type === "TEXT") {
    walkToText(context, node);
  } else if (node.type === "VECTOR") {
    // TODO:
  } else if (node.type === "WIDGET") {
    // NOTE: Skip because it is figjam property
  }

  context.unnest();
}

export function walkToComponent(context: SwiftUIContext, node: ComponentNode) {}
export function walkToEllipse(context: SwiftUIContext, node: EllipseNode) {}
export function walkToGroup(context: SwiftUIContext, node: GroupNode) {}
export function walkToLine(context: SwiftUIContext, node: LineNode) {}
export function walkToRectagnle(context: SwiftUIContext, node: RectangleNode) {}
export function walkToShapeWithText(
  context: SwiftUIContext,
  node: ShapeWithTextNode
) {}
export function walkToText(context: SwiftUIContext, node: TextNode) {}
export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  const { children } = node;
  children.forEach((child) => {
    const { id, name, type } = child;
    const { indentLevel } = context;
    console.log(JSON.stringify({ id, name, type, indentLevel }));

    walk(context, child);
  });
}
