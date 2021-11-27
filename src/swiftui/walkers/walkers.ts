import * as assert from "assert";
import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForPadding } from "../modifiers/padding";
import { walkForTextModifier } from "../modifiers/text";
import { walkForImage } from "../image";
import { isBlendMixin } from "../type/type_guards";
import { walkForMask } from "../modifiers/mask";
import { walkForClipShape } from "../modifiers/clipShape";
import {
  walkForFixedFrame,
  adaptFrameModifierWithFrameNode,
} from "../modifiers/frame/frame";
import { walkForBackgroundColor } from "../modifiers/backgroundColor";
import { walkForBorder } from "../modifiers/border";
import { walkForPosition } from "../modifiers/position";
import { walkForFixedSpacer } from "../view/spacer";
import { mappedSwiftUIColor } from "../util/mapper";
import { walkForCornerRadius } from "../modifiers/cornerRadius";

export function walk(context: SwiftUIContext, node: SceneNode) {
  // trace(`#walk`, context, node);
  if (node.name.startsWith("SwiftUI::Button")) {
    context.lineBreak();
    context.add("Button(action: { /* TODO */ }) {\n");
    context.nest();
    walkToFigmaNode(context, node);
    context.unnest();
    context.lineBreak();
    context.add("}\n");
    return;
  } else {
    walkToFigmaNode(context, node);
  }
}

export function walkToFigmaNode(context: SwiftUIContext, node: SceneNode) {
  // trace(`#walkToFigmaNode`, context, node);
  if (node.type === "BOOLEAN_OPERATION") {
    // NOTE: Skip
  } else if (node.type === "CODE_BLOCK") {
    // NOTE: Skip
  } else if (node.type === "COMPONENT") {
    walkToComponent(context, node);
  } else if (node.type === "COMPONENT_SET") {
    assert(!node.children.every((component) => component.type === "COMPONENT"));
    node.children.forEach((child) => {
      context.nest();
      walkToComponent(context, child as ComponentNode);
      context.unnest();
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

  const isContainMaskNode = node.children.some(
    (e) => isBlendMixin(e) && e.isMask
  );
  if (isContainMaskNode) {
    if (node.children.length === 2) {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      walk(context, target);

      const { id, width, height } = target;
      console.log(JSON.stringify({ id, width, height }));

      const maskNode = reversed[1] as BlendMixin & SceneNode;
      walkForClipShape(context, target, maskNode);
    } else {
      const reversed = Array.from(node.children).reverse();
      const target = reversed[0];
      walk(context, target);

      reversed.slice(1).forEach((child) => {
        context.nest();
        if (isBlendMixin(child)) {
          walkForMask(context, target, child);
        } else {
          assert(false, "unexpected is not mask node");
        }
        context.unnest();
      });
    }

    walkForFixedFrame(context, node);
  } else {
    node.children.forEach((child) => {
      context.nest();
      walk(context, child);
      context.unnest();
    });
  }
  walkForPosition(context, node);
}
export function walkToLine(context: SwiftUIContext, node: LineNode) {
  trace(`#walkToLine`, context, node);

  const { latestFrameNode } = context;

  if (latestFrameNode != null) {
    if (latestFrameNode.node.layoutMode === "VERTICAL") {
      context.lineBreak();
      context.add("Divider()\n");

      if (node.width !== context.root.width) {
        context.nest();
        context.add(`.frame(width: ${node.width})\n`);
        context.unnest();
      }
    } else if (latestFrameNode.node.layoutMode === "HORIZONTAL") {
      context.lineBreak();
      context.add("Divider()\n");

      if (node.height !== context.root.height) {
        context.nest();
        context.add(`.frame(height: ${node.height})\n`);
        context.unnest();
      }
    } else if (latestFrameNode.node.layoutMode === "NONE") {
      context.lineBreak();
      context.add("Divider()\n");

      walkForPosition(context, node);
    } else {
      const _: never = latestFrameNode.node.layoutMode;
    }
  }
}
export function walkToRectangle(context: SwiftUIContext, node: RectangleNode) {
  trace(`#walkToRectangle`, context, node);
  const { name, fills } = node;
  if (fills !== figma.mixed) {
    for (const fill of fills) {
      if (fill.type === "IMAGE") {
        walkForImage(context, fill, node);
        if (fill.scaleMode === "FIT") {
          walkForFixedFrame(context, node);
        }
      }
    }
  }

  if (name === "SwiftUI::Spacer") {
    walkForFixedSpacer(context, node);
  } else {
    walkForCornerRadius(context, node);
    walkForBorder(context, node);
    walkForPosition(context, node);
  }
}
export function walkToShapeWithText(
  context: SwiftUIContext,
  node: ShapeWithTextNode
) {
  trace(`#walkToShapeWithText`, context, node);
}
export function walkToText(context: SwiftUIContext, node: TextNode) {
  trace(`#walkToText`, context, node);
  const { characters, fills } = node;

  if (fills === figma.mixed) {
    // TODO: Styled mixed pattern
    // var nextStyleIndex = 0;
    // var isFirstText = true;
    // for (var i = nextStyleIndex; i < characters.length; i++) {
    //   const fillComponent = node.getRangeFills(nextStyleIndex, i + 1);
    //   if (i !== characters.length - 1 && fillComponent != figma.mixed) {
    //     continue;
    //   }
    //   const componentFills = node.getRangeFills(nextStyleIndex, i - 1);
    //   if (componentFills === figma.mixed || componentFills.length !== 1) {
    //     console.log(`[DEBUG] assertion`);
    //     assert(false);
    //   }
    //   const fill = componentFills[0];
    //   if (fill.type === "SOLID") {
    //     if (!isFirstText) {
    //       context.add(" + \n", { withoutIndent: true });
    //     }
    //     context.add(`Text("${characters.substring(nextStyleIndex, i)}")\n`);
    //     context.nest();
    //     context.add(
    //       `.foregroundColor(${mappedSwiftUIColor(fill.color, fill.opacity)})`
    //     );
    //     context.unnest();
    //     isFirstText = false;
    //   }
    //   nextStyleIndex = i;
    // }
    // context.lineBreak();
  } else {
    const stringList = characters.split("\n");
    if (stringList.length <= 1) {
      context.add(`Text(verbatim: "${characters}")\n`);
    } else {
      context.add(`Text(verbatim: """\n`);
      stringList.forEach((string) => {
        context.nest();
        context.add(`${string}\n`);
        context.unnest();
      });
      context.add(`""")`);
    }
    walkForTextModifier(context, node);
  }

  const { name, layoutAlign, layoutGrow } = node;
  console.log(JSON.stringify({ name, layoutAlign, layoutGrow }));

  if (layoutAlign === "STRETCH") {
    const { latestFrameNode } = context;
    if (latestFrameNode != null) {
      const { node: container } = latestFrameNode;

      if (container.layoutMode === "VERTICAL") {
        context.lineBreak();
        context.nest();
        context.add(`.frame(maxWidth: .infinity)\n`);
        context.unnest();
      } else if (container.layoutMode === "HORIZONTAL") {
        context.lineBreak();
        context.nest();
        context.add(`.frame(maxHeight: .infinity)\n`);
        context.unnest();
      }
    }
  }
}
export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const {
    children,
    layoutMode,
    layoutAlign,
    itemSpacing,
    counterAxisAlignItems,
    primaryAxisSizingMode,
    primaryAxisAlignItems,
  } = node;

  var containerCode: string = "";
  if (layoutMode === "HORIZONTAL") {
    context.push(node);

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
    context.push(node);

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
  } else if (layoutMode === "NONE") {
    context.push(node);

    if (children.length > 1) {
      containerCode += "ZStack";
    }
  } else {
    const _: never = layoutMode;
  }

  const isExistsContainer = containerCode.length > 0;
  if (isExistsContainer) {
    context.lineBreak();
    context.add(containerCode);
    context.add(" {\n", { withoutIndent: true });

    if (
      (layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
      primaryAxisAlignItems === "MAX"
    ) {
      context.lineBreak();
      context.nest();
      context.add("Spacer()\n");
      context.unnest();
    }
  }

  if (primaryAxisAlignItems === "SPACE_BETWEEN") {
    context.nest();
    context.add(`Spacer()\n`);
    context.unnest();
  }
  children.forEach((child) => {
    context.nest();
    walk(context, child);
    if (primaryAxisAlignItems === "SPACE_BETWEEN") {
      context.add(`Spacer()\n`);
    }
    context.unnest();
  });

  if (isExistsContainer) {
    if (
      (layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
      primaryAxisAlignItems === "MIN"
    ) {
      if (layoutAlign === "STRETCH" && primaryAxisSizingMode === "FIXED") {
        context.lineBreak();
        context.nest();
        context.add("Spacer()\n");
        context.unnest();
      } else {
        if (context.root.id !== node.id) {
          if (layoutMode === "VERTICAL") {
            if (node.height === context.root.height) {
              context.lineBreak();
              context.nest();
              context.add("Spacer()\n");
              context.unnest();
            }
          } else if (layoutMode === "HORIZONTAL") {
            if (node.width === context.root.width) {
              context.lineBreak();
              context.nest();
              context.add("Spacer()\n");
              context.unnest();
            }
          } else {
            const _: never = layoutMode;
          }
        }
      }
    }

    context.lineBreak();
    context.add("}\n");

    walkForPadding(context, node);
    adaptFrameModifierWithFrameNode(context, node);
    walkForBackgroundColor(context, node);
    walkForCornerRadius(context, node);

    context.pop();
  }
}
