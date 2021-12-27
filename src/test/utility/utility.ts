/**
    Call figma.loadFontAsync({ family: "Roboto", style: "Regular" }); before creating a TextNode
*/
export function createText(text: string): TextNode {
  const node = figma.createText();
  node.name = "Text 1";
  node.characters = text;
  node.fills = [];
  node.strokes = [];
  node.effects = [];
  return node;
}

export function createHStack(): FrameNode {
  const hstack = figma.createFrame();
  hstack.name = "SwiftUI::Grid";
  hstack.layoutMode = "HORIZONTAL";
  hstack.counterAxisAlignItems = "MIN";
  hstack.paddingLeft = 0;
  hstack.paddingTop = 0;
  hstack.paddingRight = 0;
  hstack.paddingBottom = 0;
  hstack.itemSpacing = 10;
  hstack.appendChild(createText("1"));
  hstack.appendChild(createText("2"));
  hstack.appendChild(createText("3"));
  hstack.strokes = [];
  hstack.effects = [];
  return hstack;
}
