import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForPadding } from "../modifiers/padding";
import { adaptFrameModifierWithFrameNode } from "../modifiers/frame/frame";
import { walkForBackgroundColor } from "../modifiers/backgroundColor";
import { walkForPosition } from "../modifiers/position";
import { walkForCornerRadius } from "../modifiers/cornerRadius";
import { walk } from "./walk";


export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const {
    name, children, layoutMode, layoutAlign, itemSpacing, counterAxisAlignItems, primaryAxisSizingMode, primaryAxisAlignItems,
  } = node;

  if (name.startsWith("SwiftUI::Button")) {
    context.lineBreak();
    context.add("Button(action: { /* TODO */ }) {\n");
    children.forEach((child) => {
      context.nest();
      walk(context, child);
      context.unnest();
    });
    context.lineBreak();
    context.add("}\n");

    walkForPadding(context, node);
    walkForBackgroundColor(context, node);
    walkForCornerRadius(context, node);
    adaptFrameModifierWithFrameNode(context, node);
    walkForPosition(context, node);
  } else {
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

      if ((layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
        primaryAxisAlignItems === "MAX") {
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
      if ((layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
        primaryAxisAlignItems === "MIN") {
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
      walkForPosition(context, node);

      context.pop();
    }
  }
}
