import * as assert from "assert";
import { BuildContext } from "./swiftui/builders/context";
import { walk as walkToSwiftUI } from "./swiftui/builders/entrypoint";
import { SwiftUIContext } from "./swiftui/context";
import { walk as walkToFigma } from "./swiftui/walks/walk";

const main = async () => {
  const root = figma.currentPage.selection[0];
  const code = run(root);
  console.log(code);
  figma.closePlugin();
};

export const run = (root: SceneNode): string => {
  const figmaContext = new SwiftUIContext();
  walkToFigma(figmaContext, root);
  assert(figmaContext.root != null);

  const buildContext = new BuildContext();
  walkToSwiftUI(buildContext, root);
  return buildContext.code;
};

main();
