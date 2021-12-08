import * as assert from "assert";
import { View } from "../../types/views";
import { FigmaContext } from "../context";
import { appendBackgroundColor } from "./backgroundColor";
import { appendCornerRadius } from "./cornerRadius";
import { appendFrameModifierWithFrameNode } from "./frame";
import { appendPadding } from "./padding";
import { appendPosition } from "./position";

export function adaptModifier(
  context: FigmaContext,
  view: View,
  node: SceneNode
) {
  if (node.type === "FRAME") {
  } else if (node.type === "RECTANGLE") {
    appendFrameModifierWithFrameNode(context, view, node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    appendPosition(context, view, node);
  } else if (node.type === "COMPONENT") {
  }

  if (node.type === "BOOLEAN_OPERATION") {
    // NOTE: Unsupported
  } else if (node.type === "CODE_BLOCK") {
    // NOTE: Unsupported
  } else if (node.type === "COMPONENT") {
    appendPadding(context, context.findBy(node), node);
  } else if (node.type === "COMPONENT_SET") {
    // NOTE: Skip. Because adapt modifier via node.type === 'COMPONENT'
  } else if (node.type === "CONNECTOR") {
    // NOTE: Unsupported because it is figjam property
  } else if (node.type === "ELLIPSE") {
    walkToEllipse(context, node);
  } else if (node.type === "FRAME") {
    appendPadding(context, view, node);
    appendFrameModifierWithFrameNode(context, view, node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    appendPosition(context, view, node);
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
    appendFrameModifierWithFrameNode(context, view, node);
    appendBackgroundColor(context, view, node);
    appendCornerRadius(context, view, node);
    appendPosition(context, view, node);
  } else if (node.type === "SHAPE_WITH_TEXT") {
    walkToShapeWithText(context, node);
  } else if (node.type === "SLICE") {
    // NOTE: Unsupported
  } else if (node.type === "STAMP") {
    // NOTE: Unsupported
  } else if (node.type === "STAR") {
    walkToStar(context, node);
  } else if (node.type === "STICKY") {
    // NOTE: Unsupported
  } else if (node.type === "TEXT") {
    walkToText(context, node);
  } else if (node.type === "VECTOR") {
    // TODO:
  } else if (node.type === "WIDGET") {
    // NOTE: Unsupported because it is figjam property
  } else {
    // NOTE: Check if all cases are covered
    const _: never = node;
  }
}
