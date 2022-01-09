export type SwiftUIListModifier = ListStyleModifier;

const listModifierTypes = ["listStyle"] as const;

export function isSwiftUIListModifier(args: {
  type: string;
}): args is SwiftUIListModifier {
  return (listModifierTypes as Readonly<string[]>).includes(args.type);
}

export interface ListModifier {
  readonly type: typeof listModifierTypes[number];
}

export interface ListStyleModifier extends ListModifier {
  readonly type: "listStyle";

  name: string;
}
