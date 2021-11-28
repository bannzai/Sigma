import { trace } from "../util/tracer";
import { isFakeRootView, SwiftUIContext } from "../context";
import { walkForPadding } from "../modifiers/padding";
import { adaptFrameModifierWithFrameNode } from "../modifiers/frame/frame";
import { walkForBackgroundColor } from "../modifiers/backgroundColor";
import { walkForPosition } from "../modifiers/position";
import { walkForCornerRadius } from "../modifiers/cornerRadius";
import { walk } from "./walk";
import {
  Button,
  ChildrenMixin,
  HStack,
  Spacer,
  View,
  VStack,
  ZStack,
} from "../types/views";

export function walkToFrame(context: SwiftUIContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const {
    name,
    children,
    layoutMode,
    layoutAlign,
    itemSpacing,
    counterAxisAlignItems,
    primaryAxisSizingMode,
    primaryAxisAlignItems,
  } = node;

  if (name.startsWith("SwiftUI::Button")) {
    const button: Button = {
      name: "Button",
      node: node,
      parent: context.container,
      modifiers: [],
      children: [],
    };

    context.nestContainer(button);
    children.forEach((child) => {
      walk(context, child);
    });
    context.unnestContainer();

    walkForPadding(context, node);
    walkForBackgroundColor(context, node);
    walkForCornerRadius(context, node);
    adaptFrameModifierWithFrameNode(context, node);
    walkForPosition(context, node);
  } else {
    let containerReference!: ChildrenMixin & View;
    if (layoutMode === "HORIZONTAL") {
      const hstack: HStack = {
        name: "HStack",
        axis: "H",
        modifiers: [],
        parent: context.container,
        node: node,
        children: [],
        alignment: (function () {
          if (counterAxisAlignItems === "MIN") {
            return "top";
          } else if (counterAxisAlignItems === "MAX") {
            return "bottom";
          } else {
            return "center";
          }
        })(),
        spacing: itemSpacing,
      };
      context.nestContainer(hstack);
      containerReference = hstack;
    } else if (layoutMode === "VERTICAL") {
      const vstack: VStack = {
        name: "VStack",
        axis: "V",
        modifiers: [],
        parent: context.container,
        node: node,
        children: [],
        alignment: (function () {
          if (counterAxisAlignItems === "MIN") {
            return "leading";
          } else if (counterAxisAlignItems === "MAX") {
            return "trailing";
          } else {
            return "center";
          }
        })(),
        spacing: itemSpacing,
      };
      context.nestContainer(vstack);
      containerReference = vstack;
    } else if (layoutMode === "NONE") {
      const zstack: ZStack = {
        name: "ZStack",
        axis: "Z",
        modifiers: [],
        parent: context.container,
        node: node,
        children: [],
      };
      context.nestContainer(zstack);
      containerReference = zstack;
    } else {
      const _: never = layoutMode;
    }

    if (
      (layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
      primaryAxisAlignItems === "MAX"
    ) {
      const spacer: Spacer = {
        name: "Spacer",
        modifiers: [],
        parent: containerReference,
        node: null,
      };
      context.addChild(spacer);
    }

    if (primaryAxisAlignItems === "SPACE_BETWEEN") {
      const spacer: Spacer = {
        name: "Spacer",
        modifiers: [],
        parent: containerReference,
        node: null,
      };
      context.addChild(spacer);
    }

    children.forEach((child) => {
      walk(context, child);
      if (primaryAxisAlignItems === "SPACE_BETWEEN") {
        const spacer: Spacer = {
          name: "Spacer",
          modifiers: [],
          parent: containerReference,
          node: null,
        };
        context.addChild(spacer);
      }
    });

    if (
      (layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
      primaryAxisAlignItems === "MIN"
    ) {
      // NOTE: This conditional expression may be wrong. I do not remember
      if (layoutAlign === "STRETCH" && primaryAxisSizingMode === "FIXED") {
        const spacer: Spacer = {
          name: "Spacer",
          modifiers: [],
          parent: containerReference,
          node: null,
        };
        context.addChild(spacer);
      } else {
        if (
          !isFakeRootView(context.root) &&
          context.root.node?.id !== node.id
        ) {
          if (layoutMode === "VERTICAL") {
            if (node.height === context.root.node?.height) {
              const spacer: Spacer = {
                name: "Spacer",
                modifiers: [],
                parent: containerReference,
                node: null,
              };
              context.addChild(spacer);
            }
          } else if (layoutMode === "HORIZONTAL") {
            if (node.width === context.root.node?.width) {
              const spacer: Spacer = {
                name: "Spacer",
                modifiers: [],
                parent: containerReference,
                node: null,
              };
              context.addChild(spacer);
            }
          } else {
            const _: never = layoutMode;
          }
        }
      }

      walkForPadding(context, node);
      adaptFrameModifierWithFrameNode(context, node);
      walkForBackgroundColor(context, node);
      walkForCornerRadius(context, node);
      walkForPosition(context, node);

      context.unnestContainer();
    }
  }
}
