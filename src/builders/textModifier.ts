import { SwiftUITextModifier } from "../types/textModifier";
import { mappedSwiftUIColor } from "../swiftui/util/mapper";
import { BuildContext } from "./context";

export function walkToTextModifier(
  context: BuildContext,
  textModifier: SwiftUITextModifier
) {
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
    const _: never = textModifier;
  }
}
