export interface ImageModifier {
  readonly type: string;
}

export interface ResizableImageModifier extends ImageModifier {
  readonly type: "resizable";
}
