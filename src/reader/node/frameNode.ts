import { trace } from "../../util/tracer";
import { FigmaContext } from "../context";
import { appendPadding } from "../modifiers/padding";
import { appendFrameModifierWithFrameNode } from "../modifiers/frame";
import { appendBackgroundColor } from "../modifiers/backgroundColor";
import { appendPosition } from "../modifiers/position";
import { appendCornerRadius } from "../modifiers/cornerRadius";
import { traverse } from "../entrypoint";
import {
  Button,
  ChildrenMixin,
  HStack,
  Spacer,
  View,
  VStack,
  ZStack,
} from "../../types/views";
import { appendBorder } from "../modifiers/border";
import { AppView } from "../../types/app";

export function walkToFrame(context: FigmaContext, node: FrameNode) {
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

  if (name.startsWith("App::")) {
    const appComponentName = name.slice(0, "App::".length);
    const appComponent: AppView = {
      type: "App",
      name: appComponentName,
      modifiers: [],
      parent: context.container,
      node: node,
    };

    context.addChild(appComponent);
  }

  if (name.startsWith("SwiftUI::Button")) {
    const button: Button = {
      type: "Button",
      node: node,
      parent: context.container,
      modifiers: [],
      children: [],
    };

    context.nestContainer(button);
    children.forEach((child) => {
      traverse(context, child);
    });
    context.unnestContainer();

    appendPadding(context, button, node);
    appendFrameModifierWithFrameNode(context, button, node);
    appendBackgroundColor(context, button, node);
    appendCornerRadius(context, button, node);
    appendBorder(context, button, node);
    appendPosition(context, button, node);
  } else {
    let containerReference!: ChildrenMixin & View;
    if (layoutMode === "HORIZONTAL") {
      const hstack: HStack = {
        type: "HStack",
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
      containerReference = hstack;
    } else if (layoutMode === "VERTICAL") {
      const vstack: VStack = {
        type: "VStack",
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
      containerReference = vstack;
    } else if (layoutMode === "NONE") {
      const zstack: ZStack = {
        type: "ZStack",
        axis: "Z",
        modifiers: [],
        parent: context.container,
        node: node,
        children: [],
      };
      containerReference = zstack;
    } else {
      const _: never = layoutMode;
    }

    context.nestContainer(containerReference);
    if (
      (layoutMode === "VERTICAL" || layoutMode === "HORIZONTAL") &&
      primaryAxisAlignItems === "MAX"
    ) {
      const spacer: Spacer = {
        type: "Spacer",
        modifiers: [],
        parent: containerReference,
        node: null,
      };
      context.addChild(spacer);
    }

    children.forEach((child, index) => {
      traverse(context, child);
      if (
        primaryAxisAlignItems === "SPACE_BETWEEN" &&
        index !== children.length - 1
      ) {
        const spacer: Spacer = {
          type: "Spacer",
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
          type: "Spacer",
          modifiers: [],
          parent: containerReference,
          node: null,
        };
        context.addChild(spacer);
      } else {
        if (context.root != null && context.root.node?.id !== node.id) {
          if (layoutMode === "VERTICAL") {
            if (node.height === context.root.node?.height) {
              const spacer: Spacer = {
                type: "Spacer",
                modifiers: [],
                parent: containerReference,
                node: null,
              };
              context.addChild(spacer);
            }
          } else if (layoutMode === "HORIZONTAL") {
            if (node.width === context.root.node?.width) {
              const spacer: Spacer = {
                type: "Spacer",
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
    }

    appendPadding(context, containerReference, node);
    appendFrameModifierWithFrameNode(context, containerReference, node);
    appendBackgroundColor(context, containerReference, node);
    appendCornerRadius(context, containerReference, node);
    appendBorder(context, containerReference, node);
    appendPosition(context, containerReference, node);

    context.unnestContainer();
  }
}
