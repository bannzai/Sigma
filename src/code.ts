import { walkToScene } from "./src/swiftui/walkers/walkers";

const run = () => {
  const root = figma.currentPage.selection[0];
  const traversedContext = traversed(root);
  print(traversedContext);
};

const traversed = (root: SceneNode): SwiftUIContext => {
  const context = new SwiftUIContext();
  walkToScene(context, root);
  return context;
};

const print = (context: SwiftUIContext) => {
  console.log(context.code.length);
};

run();
figma.closePlugin();
