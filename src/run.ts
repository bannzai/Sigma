const assert = require("assert");
import { BuildContext } from "./builders/context";
import { walk as walkToSwiftUI } from "./builders/entrypoint";
import { FigmaContext } from "./swiftui/figma/context";
import { walk as walkToFigma } from "./swiftui/figma/walk";

export const run = (root: SceneNode): string => {
  const figmaContext = new FigmaContext();
  walkToFigma(figmaContext, root);
  assert(figmaContext.root != null, "it is necessary root");

  const buildContext = new BuildContext();
  walkToSwiftUI(buildContext, figmaContext.root);
  return buildContext.code;
};
