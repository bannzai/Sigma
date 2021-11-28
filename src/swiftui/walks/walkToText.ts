import { trace } from "../util/tracer";
import { SwiftUIContext } from "../context";
import { walkForTextModifier } from "../modifiers/text";
import { adaptFrameModifierWithFrameNode } from "../modifiers/frame/frame";

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
      context.add(`Text("${characters}")\n`);
    } else {
      context.add(`Text("""\n`);
      stringList.forEach((string) => {
        context.nest();
        context.add(`${string}\n`);
        context.unnest();
      });
      context.add(`""")`);
    }
    walkForTextModifier(context, node);
  }

  adaptFrameModifierWithFrameNode(context, node);
}
