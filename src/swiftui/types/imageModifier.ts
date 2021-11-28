export interface ImageModifier {
  type: string;
}

export interface ResizableImageModifier extends ImageModifier {
  type: "resizable";
}
