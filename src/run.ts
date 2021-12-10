const assert = require("assert");
import { BuildContext } from "./builder/context";
import { build, buildBody } from "./builder/entrypoint";
import { FigmaContext } from "./reader/context";
import { traverse } from "./reader/entrypoint";

export const run = (root: SceneNode): string => {
  const figmaContext = new FigmaContext();
  traverse(figmaContext, root);
  assert(figmaContext.root != null, "it is necessary root");

  const buildContext = new BuildContext();
  build(buildContext, figmaContext.root);
  figmaContext.appViewReferences.forEach((e) => {
    build(buildContext, e);
  });
  return buildContext.code;
};
