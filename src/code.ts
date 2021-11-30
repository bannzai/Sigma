import * as assert from "assert";
import { BuildContext } from "./swiftui/builders/context";
import { walk as walkToSwiftUI } from "./swiftui/builders/entrypoint";
import { SwiftUIContext } from "./swiftui/context";
import { walk as walkToFigma } from "./swiftui/walks/walk";

const run = async () => {
  const root = figma.currentPage.selection[0];

  const figmaContext = new SwiftUIContext();
  walkToFigma(figmaContext, root);
  assert(figmaContext.root != null);

  const buildContext = new BuildContext();
  walkToSwiftUI(buildContext, root);

  console.log(buildContext.code);
  figma.closePlugin();
};

run();
