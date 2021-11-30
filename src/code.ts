import * as assert from "assert";
import { BuildContext } from "./swiftui/builders/context";
import { walk as walkToSwiftUI } from "./swiftui/builders/entrypoint";
import { isFakeRootView, SwiftUIContext } from "./swiftui/context";
import { walk as walkToFigma } from "./swiftui/walks/walk";

const run = async () => {
  const root = figma.currentPage.selection[0];
  const traversedContext = traversed(root);
  assert(!isFakeRootView(traversedContext.root));
  const code = build(traversedContext.root);
  figma.closePlugin();
};

const traversed = (root: SceneNode): SwiftUIContext => {
  const context = new SwiftUIContext();
  walkToFigma(context, root);
  return context;
};

const build = (root: { type: string }): string => {
  const context = new BuildContext();
  walkToSwiftUI(context, root);
  return context.code;
};

const print = (context: SwiftUIContext) => {
  // console.log(context.code);
};

run();
