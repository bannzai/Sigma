import { SwiftUIContext } from "./swiftui/context";
import { walk } from "./swiftui/walkers/walkers";

const run = async () => {
  const root = figma.currentPage.selection[0];
  const traversedContext = traversed(root);
  print(traversedContext);

  // For debugging code
  const rect = figma.createText();
  rect.x = 100;
  rect.y = 50;
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  rect.characters = traversedContext.code;
  rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
  figma.currentPage.appendChild(rect);
  const nodes = [rect];
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  figma.closePlugin();
};

const traversed = (root: SceneNode): SwiftUIContext => {
  const context = new SwiftUIContext();
  walk(context, root);
  return context;
};

const print = (context: SwiftUIContext) => {
  console.log(context.code);
};

run();
