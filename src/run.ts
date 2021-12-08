const assert = require("assert");
import { BuildContext } from "./builder/context";
import { build as walkToSwiftUI } from "./builder/entrypoint";
import { FigmaContext } from "./reader/context";
import { traverse as walkToFigma } from "./reader/entrypoint";

export const run = (root: SceneNode): string => {
  const figmaContext = new FigmaContext();
  walkToFigma(figmaContext, root);
  assert(figmaContext.root != null, "it is necessary root");

  const buildContext = new BuildContext();
  walkToSwiftUI(buildContext, figmaContext.root);
  return buildContext.code;
};
