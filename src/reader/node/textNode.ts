import { trace } from "../tracer";
import { FigmaContext } from "../context";
import { appendTextModifier } from "../modifiers/textModifier";
import { Text } from "../../types/views";
import { appendForegroundColor } from "../modifiers/foregroundColor";
import { appendDropShadow } from "../modifiers/dropShadow";

export function walkToText(context: FigmaContext, node: TextNode) {
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
    const text: Text = {
      type: "Text",
      text: characters,
      multipleLineSyntax: characters.split("\n").length > 1,
      modifiers: [],
      node: node,
    };
    context.addChild(text);

    appendTextModifier(context, node, text);
    appendForegroundColor(context, node, text);
    appendDropShadow(context, text, node);
  }
}
