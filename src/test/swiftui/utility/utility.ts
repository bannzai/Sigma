/**
    Call figma.loadFontAsync({ family: "Roboto", style: "Regular" }); before creating a TextNode
*/
export function createText(text: string): TextNode {
  const node = figma.createText();
  node.characters = text;
  node.fills = [];
  return node;
}
