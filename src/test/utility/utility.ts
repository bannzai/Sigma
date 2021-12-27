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

export function createHStack(...children: SceneNode[]): FrameNode {
  const hstack = figma.createFrame();
  hstack.name = "Frame 1";
  hstack.layoutMode = "HORIZONTAL";
  hstack.counterAxisAlignItems = "MIN";
  hstack.paddingLeft = 0;
  hstack.paddingTop = 0;
  hstack.paddingRight = 0;
  hstack.paddingBottom = 0;
  hstack.itemSpacing = 10;
  children.forEach((child) => {
    hstack.appendChild(child);
  });
  hstack.strokes = [];
  hstack.effects = [];
  return hstack;
}

export function createVStack(...children: SceneNode[]): FrameNode {
  const vstack = figma.createFrame();
  vstack.name = "Frame 1";
  vstack.layoutMode = "VERTICAL";
  vstack.counterAxisAlignItems = "MIN";
  vstack.paddingLeft = 0;
  vstack.paddingTop = 0;
  vstack.paddingRight = 0;
  vstack.paddingBottom = 0;
  vstack.itemSpacing = 10;
  children.forEach((child) => {
    vstack.appendChild(child);
  });
  vstack.strokes = [];
  vstack.effects = [];
  return vstack;
}
