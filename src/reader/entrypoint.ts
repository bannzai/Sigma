const assert = require("assert");
import { FigmaContext } from "./context";
import { walkToComponent } from "./node/componentNode";
import { walkToEllipse } from "./node/ellipseNode";
import { walkToGroup } from "./node/groupNode";
import { walkToLine } from "./node/lineNode";
import { walkToRectangle } from "./node/rectangleNode";
import { walkToShapeWithText } from "./node/shapeWithTextNode";
import { walkToText } from "./node/textNode";
import { walkToFrame } from "./node/frameNode";
import { trace } from "./tracer";
import { walkToStar } from "./node/starNode";
import { AppViewInfo } from "../types/app";
import { walkToVector } from "./node/vectorNode";

export function traverse(context: FigmaContext, node: SceneNode) {
  trace(`#traverse`, context, node);

  const { name } = node;

  if (name.startsWith("App::")) {
    const appComponentOriginalName = name.slice("App::".length);
    const countOfSameNameView = context.countOfAppView(
      appComponentOriginalName
    );
    let appComponentName = appComponentOriginalName;
    if (countOfSameNameView > 0) {
      appComponentName = appComponentName + `_${countOfSameNameView}`;
    }
    const appComponentInfo: AppViewInfo = {
      appComponentOriginalName,
      appComponentName: appComponentName,
    };

    context.beginAppComponentContext(appComponentInfo);
  }

  if (node.type === "BOOLEAN_OPERATION") {
    // NOTE: Unsupported
  } else if (node.type === "CODE_BLOCK") {
    // NOTE: Unsupported
  } else if (node.type === "COMPONENT") {
    walkToComponent(context, node);
  } else if (node.type === "COMPONENT_SET") {
    assert(!node.children.every((component) => component.type === "COMPONENT"));
    node.children.forEach((child) => {
      walkToComponent(context, child as ComponentNode);
    });
  } else if (node.type === "CONNECTOR") {
    // NOTE: Unsupported because it is figjam property
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
    walkToVector(context, node);
  } else if (node.type === "WIDGET") {
    // NOTE: Unsupported because it is figjam property
  } else {
    // @ts-ignore
    const _: never = node;
  }
}
