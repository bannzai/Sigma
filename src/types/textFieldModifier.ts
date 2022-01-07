export type SwiftUITextFieldModifier = TextFieldStyleModifier;

const buttonModifierTypes = ["textFieldStyle"] as const;

export function isSwiftUITextFieldModifier(args: {
  type: string;
}): args is SwiftUITextFieldModifier {
  return (buttonModifierTypes as Readonly<string[]>).includes(args.type);
}

export interface TextFieldModifier {
  readonly type: typeof buttonModifierTypes[number];
}

export interface TextFieldStyleModifier extends TextFieldModifier {
  readonly type: "textFieldStyle";

  name: string;
}
