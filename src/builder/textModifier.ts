import { SwiftUITextModifier } from "../types/textModifier";
import { mappedSwiftUIColor } from "../util/mapper";
import { BuildContext } from "./context";
import { trace } from "./tracer";

export function buildTextModifier(
  context: BuildContext,
  textModifier: SwiftUITextModifier
) {
  trace("#buildTextModifier", context, textModifier);

  if (textModifier.type === "underline") {
    context.add(`.underline()`);
  } else if (textModifier.type === "strikethrough") {
    context.add(`.strikethrough()`);
  } else if (textModifier.type === "fontWeight") {
    context.add(`.fontWeight(.${textModifier.fontWeight})`);
  } else if (textModifier.type === "font") {
    var args: string[] = [];
    if (textModifier.size != null) {
      args.push(`size: ${textModifier.size}`);
    }
    const fontArgument = args.join(", ");
    context.add(`.font(.${textModifier.namedType}(${fontArgument}))`);
  } else if (textModifier.type === "foregroundColor") {
    context.add(`.foregroundColor(${mappedSwiftUIColor(textModifier.color)})`);
  } else {
    // @ts-ignore
    const _: never = textModifier;
  }
}
