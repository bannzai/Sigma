export type SwiftUIImageModifier = ResizableImageModifier;

const imageModifierTypes = ["resizable"] as const;
export function isSwiftUIImageModifier(args: {
  type: string;
}): args is ImageModifier {
  return (imageModifierTypes as Readonly<string[]>).includes(args.type);
}

export interface ImageModifier {
  readonly type: typeof imageModifierTypes[number];
}

export interface ResizableImageModifier extends ImageModifier {
  readonly type: "resizable";
}
