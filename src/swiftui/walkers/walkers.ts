import * as assert from "assert";
import { trace } from "../../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForPadding } from "../modifiers/padding";
import { walkForTextModifier } from "../modifiers/text";
import { walkForImage } from "../image";
import { isBlendMixin } from "../type/type_guards";
import { walkForClipShape } from "../modifiers/clipShape";

export function walk(context: SwiftUIContext, node: SceneNode) {
  // trace(`#walk`, context, node);

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

  context.unnest();
}

export function walkToComponent(context: SwiftUIContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);

  walkForPadding(context, node);
}
export function walkToEllipse(context: SwiftUIContext, node: EllipseNode) {
  trace(`#walkToEllipse`, context, node);
  context.add("Ellipse()");
}
export function walkToGroup(context: SwiftUIContext, node: GroupNode) {
  trace(`#walkToGroup`, context, node);

  if (node.name.includes("SwiftUI:Button")) {
    context.add("Button(action: { /* TODO */ }) {\n");
    node.children.forEach((child) => {
      walk(context, child);
    });
    context.lineBreak();
    context.add("}");
  } else {
    node.children.forEach((child) => {
      walk(context, child);
    });
  }
}
export function walkToLine(context: SwiftUIContext, node: LineNode) {
  trace(`#walkToLine`, context, node);
}
export function walkToRectangle(context: SwiftUIContext, node: RectangleNode) {
  trace(`#walkToRectangle`, context, node);
  walkForImage(context, node);
}
export function walkToShapeWithText(
  context: SwiftUIContext,
  node: ShapeWithTextNode
) {
  trace(`#walkToShapeWithText`, context, node);
}
export function walkToText(context: SwiftUIContext, node: TextNode) {
  trace(`#walkToText`, context, node);

  const { characters } = node;
  const stringList = characters.split("\n");
  if (stringList.length <= 1) {
    context.add(`Text("${characters}")\n`);
  } else {
    context.add(`Text("""\n`);
    stringList.forEach((string) => {
      context.add(`${string}\n`);
    });
    context.add(`""")`);
  }

  walkForTextModifier(context, node);
}
export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const { children, layoutMode, itemSpacing, counterAxisAlignItems } = node;

  var containerCode: string = "";
  if (layoutMode === "HORIZONTAL") {
    containerCode += "HStack(";

    const args: string[] = [];
    if (counterAxisAlignItems === "MIN") {
      args.push("alignment: .top");
    } else if (counterAxisAlignItems === "MAX") {
      args.push("alignment: .bottom");
    }
    args.push(`spacing: ${itemSpacing}`);

    containerCode += args.join(", ");
    containerCode += ")";
  } else if (layoutMode === "VERTICAL") {
    containerCode += "VStack(";

    const args: string[] = [];
    if (counterAxisAlignItems === "MIN") {
      args.push("alignment: .leading");
    } else if (counterAxisAlignItems === "MAX") {
      args.push("alignment: .trailing");
    }
    args.push(`spacing: ${itemSpacing}`);

    containerCode += args.join(", ");
    containerCode += ")";
  } else if (children.length > 1) {
    containerCode += "ZStack";
  }

  const isExistsContainer = containerCode.length > 0;
  if (isExistsContainer) {
    context.lineBreak();
    context.add(containerCode);
    context.add(" {\n", { withoutIndent: true });
  }

  children.forEach((child) => {
    walk(context, child);
  });

  if (isExistsContainer) {
    context.lineBreak();
    context.add("}");
  }

  walkForPadding(context, node);
}
