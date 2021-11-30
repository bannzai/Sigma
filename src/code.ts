import * as assert from "assert";
import { BuildContext } from "./swiftui/builders/context";
import { walk as walkToSwiftUI } from "./swiftui/builders/entrypoint";
import { SwiftUIContext } from "./swiftui/context";
import { walk as walkToFigma } from "./swiftui/walks/walk";

const run = async () => {
  const root = figma.currentPage.selection[0];
  const figmaContext = new SwiftUIContext();
  traversed(figmaContext, root);
  assert(figmaContext.root != null);
  const code = build(traversedContext.root);
  console.log(code);
  figma.closePlugin();
};

const traversed = (context: SwiftUIContext, root: SceneNode) => {
  walkToFigma(context, root);
};

const build = (root: { type: string }): string => {
  const context = new BuildContext();
  walkToSwiftUI(context, root);
  return context.code;
};

run();
