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
  List,
  ScrollAxis,
  ScrollView,
  Spacer,
  Text,
  TextField,
  View,
  VStack,
  ZStack,
} from "../../types/views";
import { appendBorder } from "../modifiers/border";
import { appendDropShadow } from "../modifiers/dropShadow";
import { ButtonStyleModifier } from "../../types/buttonModifier";
import * as assert from "assert";
import { walkForHGridChildren, walkForVGridChildren } from "../view/grid";
import { TextFieldStyleModifier } from "../../types/textFieldModifier";
import { ListStyleModifier } from "../../types/listModifier";

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

      appendPadding(context, grid, node);
      appendFrameModifierWithFrameNode(context, grid, node);
      appendBackgroundColor(context, grid, node);
      appendCornerRadius(context, grid, node);
      appendBorder(context, grid, node);
      appendPosition(context, grid, node);
      appendDropShadow(context, grid, node);
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

      appendPadding(context, grid, node);
      appendFrameModifierWithFrameNode(context, grid, node);
      appendBackgroundColor(context, grid, node);
      appendCornerRadius(context, grid, node);
      appendBorder(context, grid, node);
      appendPosition(context, grid, node);
      appendDropShadow(context, grid, node);
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

    const nameWithoutMarker = name.slice("SwiftUI::Button".length);
    if (nameWithoutMarker.startsWith("#")) {
      const buttonStyleName = nameWithoutMarker.slice("#".length);
      const buttonStyleModifier: ButtonStyleModifier = {
        type: "buttonStyle",
        name: buttonStyleName,
      };
      button.modifiers.push(buttonStyleModifier);
    }
  } else if (name.startsWith("SwiftUI::ScrollView")) {
    console.log(`[DEBUG] SwiftUI::ScrollView`);

    let axis: ScrollAxis;
    if (layoutMode === "VERTICAL") {
      axis = "vertical";
    } else if (layoutMode === "HORIZONTAL") {
      axis = "horizontal";
    } else {
      // SwiftUI ScrollView default axis is vertical
      axis = "vertical";
    }

    const scrollView: ScrollView = {
      type: "ScrollView",
      node,
      modifiers: [],
      children: [],
      axis,
    };

    context.beginScrollViewContext(scrollView);
    children.forEach((child) => {
      traverse(context, child);
    });
    context.endScrollViewContext();

    appendPadding(context, scrollView, node);
    appendFrameModifierWithFrameNode(context, scrollView, node);
    appendBackgroundColor(context, scrollView, node);
    appendCornerRadius(context, scrollView, node);
    appendBorder(context, scrollView, node);
    appendPosition(context, scrollView, node);
    appendDropShadow(context, scrollView, node);
  } else if (name.startsWith("SwiftUI::List")) {
    console.log(`[DEBUG] SwiftUI::List`);

    const list: List = {
      type: "List",
      node: node,
      modifiers: [],
      children: [],
    };

    context.beginListContext(list);
    children.forEach((child) => {
      traverse(context, child);
    });
    context.endListContext();

    appendPadding(context, list, node);
    appendFrameModifierWithFrameNode(context, list, node);
    appendBackgroundColor(context, list, node);
    appendCornerRadius(context, list, node);
    appendBorder(context, list, node);
    appendPosition(context, list, node);
    appendDropShadow(context, list, node);

    const nameWithoutMarker = name.slice("SwiftUI::List".length);
    if (nameWithoutMarker.startsWith("#")) {
      const listStyleName = nameWithoutMarker.slice("#".length);
      const listStyleModifier: ListStyleModifier = {
        type: "listStyle",
        name: listStyleName,
      };
      list.modifiers.push(listStyleModifier);
    } else {
      // Sigma decided default style to plain
      const listStyleModifier: ListStyleModifier = {
        type: "listStyle",
        name: "PlainListStyle",
      };
      list.modifiers.push(listStyleModifier);
    }
  } else if (name.startsWith("SwiftUI::TextField")) {
    console.log(`[DEBUG] SwiftUI::TextField`);

    // Currently only support single text child
    const textField: TextField = {
      type: "TextField",
      node: node,
      modifiers: [],
      children: [],
    };

    context.beginTextFieldContext(textField);
    children.forEach((child) => {
      traverse(context, child);
    });
    context.endTextFieldContext();

    const firstChild = textField.children.pop();
    if (children.length > 0 && firstChild != null) {
      if (firstChild.type === "Text") {
        const text = firstChild as Text;
        textField.text = text;
        textField.modifiers.push(...text.modifiers);

        appendPadding(context, textField, node);
        appendFrameModifierWithFrameNode(context, textField, node);
        appendBackgroundColor(context, textField, node);
        appendCornerRadius(context, textField, node);
        appendBorder(context, textField, node);
        appendPosition(context, textField, node);
        appendDropShadow(context, textField, node);
      }
    }

    const nameWithoutMarker = name.slice("SwiftUI::TextField".length);
    if (nameWithoutMarker.startsWith("#")) {
      const textFieldStyleName = nameWithoutMarker.slice("#".length);
      const textFieldStyleModifier: TextFieldStyleModifier = {
        type: "textFieldStyle",
        name: textFieldStyleName,
      };
      textField.modifiers.push(textFieldStyleModifier);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
