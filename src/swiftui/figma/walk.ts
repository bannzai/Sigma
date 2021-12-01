const assert = require("assert");
import { FigmaContext } from "./context";
import { walkToComponent } from "./walkToComponent";
import { walkToEllipse } from "./walkToEllipse";
import { walkToGroup } from "./walkToGroup";
import { walkToLine } from "./walkToLine";
import { walkToRectangle } from "./walkToRectangle";
import { walkToShapeWithText } from "./walkToShapeWithText";
import { walkToText } from "./walkToText";
import { walkToFrame } from "./walkToFrame";

export function walk(context: FigmaContext, node: SceneNode) {
  // trace(`#walk`, context, node);
  if (node.type === "BOOLEAN_OPERATION") {
    // NOTE: Skip
  } else if (node.type === "CODE_BLOCK") {
    // NOTE: Skip
  } else if (node.type === "COMPONENT") {
    walkToComponent(context, node);
  } else if (node.type === "COMPONENT_SET") {
    assert(!node.children.every((component) => component.type === "COMPONENT"));
    node.children.forEach((child) => {
      walkToComponent(context, child as ComponentNode);
    });
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
    walkToRectangle(context, node);
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
  } else {
    // NOTE: Check if all cases are covered
    const _: never = node;
  }
}
