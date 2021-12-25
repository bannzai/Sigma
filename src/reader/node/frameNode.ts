import { trace } from "../tracer";
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
  LazyHGrid,
  LazyVGrid,
  Spacer,
  View,
  VStack,
  ZStack,
} from "../../types/views";
import { appendBorder } from "../modifiers/border";
import { appendDropShadow } from "../modifiers/dropShadow";
import { ButtonStyleModifier } from "../../types/buttonModifier";
import * as assert from "assert";
import { walkForHGridChildren, walkForVGridChildren } from "../view/grid";

export function walkToFrame(context: FigmaContext, node: FrameNode) {
  trace(`#walkToFrame`, context, node);

  const {
    name,
    children,
    layoutMode,
    itemSpacing,
    counterAxisAlignItems,
    primaryAxisAlignItems,
  } = node;

  if (name.startsWith("SwiftUI::Grid")) {
    console.log(`[DEBUG] SwiftUI::Grid`);
    if (layoutMode === "VERTICAL") {
      const grid: LazyVGrid = {
        type: "LazyVGrid",
        axis: "V",
        node: node,
        modifiers: [],
        children: [],
        maximumGridItemCount: 0,
      };
      walkForVGridChildren(context, node, grid);

      context.beginGridContext(grid);
      children.forEach((child) => {
        traverse(context, child);
      });
      context.endGridContext();
    } else if (layoutMode === "HORIZONTAL") {
      const grid: LazyHGrid = {
        type: "LazyHGrid",
        axis: "H",
        node: node,
        modifiers: [],
        children: [],
        maximumGridItemCount: 0,
      };
      walkForHGridChildren(context, node, grid);

      context.beginGridContext(grid);
      children.forEach((child) => {
        traverse(context, child);
      });
      context.endGridContext();
    } else {
      assert(false, "SwiftUI::Grid is necessary axis via layoutMode");
    }
  } else if (name.startsWith("SwiftUI::Button")) {
    console.log(`[DEBUG] SwiftUI::Button`);

    const button: Button = {
      type: "Button",
      node: node,
      modifiers: [],
      children: [],
    };

    context.beginButtonContext(button);
    children.forEach((child) => {
      traverse(context, child);
    });
    context.endButtonContext();

    appendPadding(context, button, node);
    appendFrameModifierWithFrameNode(context, button, node);
    appendBackgroundColor(context, button, node);
    appendCornerRadius(context, button, node);
    appendBorder(context, button, node);
    appendPosition(context, button, node);
    appendDropShadow(context, button, node);

    const nameWithoutButtonMarker = name.slice("SwiftUI::Button".length);
    if (nameWithoutButtonMarker.startsWith("#")) {
      const buttonStyleName = nameWithoutButtonMarker.slice("#".length);
      const buttonStyleModifier: ButtonStyleModifier = {
        type: "buttonStyle",
        name: buttonStyleName,
      };
      button.modifiers.push(buttonStyleModifier);
    }
  } else {
    console.log(`Stack pattern ${JSON.stringify({ layoutMode })}`);

    let containerReference!: ChildrenMixin & View;
    if (layoutMode === "HORIZONTAL") {
      const hstack: HStack = {
        type: "HStack",
        axis: "H",
        modifiers: [],
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
        node: node,
        children: [],
      };
      containerReference = zstack;
    } else {
      // @ts-ignore
      const _: never = layoutMode;
    }

    context.nestContainer(containerReference);

    children.forEach((child, index) => {
      traverse(context, child);
      if (
        primaryAxisAlignItems === "SPACE_BETWEEN" &&
        index !== children.length - 1
      ) {
        const spacer: Spacer = {
          type: "Spacer",
          modifiers: [],
          node: null,
        };
        context.addChild(spacer);
      }
    });

    appendPadding(context, containerReference, node);
    appendFrameModifierWithFrameNode(context, containerReference, node);
    appendBackgroundColor(context, containerReference, node);
    appendCornerRadius(context, containerReference, node);
    appendBorder(context, containerReference, node);
    appendPosition(context, containerReference, node);
    appendDropShadow(context, containerReference, node);

    context.unnestContainer();
  }
}
