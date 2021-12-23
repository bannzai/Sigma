export type SwiftUIButtonModifier = ButtonStyleModifier;

const buttonModifierTypes = ["buttonStyle"] as const;

export function isSwiftUITextModifier(args: {
  type: string;
}): args is SwiftUIButtonModifier {
  return (buttonModifierTypes as Readonly<string[]>).includes(args.type);
}

export interface ButtonModifier {
  readonly type: typeof buttonModifierTypes[number];
}

export interface ButtonStyleModifier extends ButtonModifier {
  readonly type: "buttonStyle";

  name: string;
}
