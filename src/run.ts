const assert = require("assert");
import { BuildContext } from "./swiftui/builders/context";
import { walk as walkToSwiftUI } from "./swiftui/builders/entrypoint";
import { SwiftUIContext } from "./swiftui/context";
import { walk as walkToFigma } from "./swiftui/walks/walk";

export const run = (root: SceneNode): string => {
  const figmaContext = new SwiftUIContext();
  walkToFigma(figmaContext, root);
  assert(figmaContext.root != null, "it is necessary root");

  const buildContext = new BuildContext();
  walkToSwiftUI(buildContext, root);
  return buildContext.code;
};
