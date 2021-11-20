import * as assert from "assert";
import { trace } from "../../util/tracer";
import { SwiftUIContext } from "../context";
import { adaptTextModifier } from "../modifiers/text";

export function walk(context: SwiftUIContext, node: SceneNode) {
  trace(`#walk`, context, node);

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

export function walkToComponent(context: SwiftUIContext, node: ComponentNode) {
  trace(`#walkToComponent`, context, node);
}
export function walkToEllipse(context: SwiftUIContext, node: EllipseNode) {
  trace(`#walkToEllipse`, context, node);
}
export function walkToGroup(context: SwiftUIContext, node: GroupNode) {
  trace(`#walkToGroup`, context, node);
}
export function walkToLine(context: SwiftUIContext, node: LineNode) {
  trace(`#walkToLine`, context, node);
}
export function walkToRectagnle(context: SwiftUIContext, node: RectangleNode) {
  trace(`#walkToRectagnle`, context, node);
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
    context.add(`Text("${characters}")`);
  } else {
    context.add(`Text("""\n`);
    stringList.forEach((string) => {
      context.add(`${string}\n`);
    });
    context.add(`""")`);
  }

  adaptTextModifier(context, node);
}
export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const { children, layoutMode, itemSpacing, counterAxisAlignItems } = node;

  console.log(
    JSON.stringify({
      children,
      layoutMode,
      itemSpacing,
      counterAxisAlignItems,
    })
  );

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
    context.add(containerCode);
    context.add(" {\n", { withoutIndent: true });
  }

  children.forEach((child) => {
    const { id, name, type } = child;
    const { indent } = context;

    walk(context, child);
  });

  if (isExistsContainer) {
    context.add("\n}\n");
  }
}
