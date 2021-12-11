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
  buildContext.current = figmaContext.root;
  build(buildContext);
  figmaContext.allAppViewReferences.forEach((e) => {
    buildContext.current = e;
    build(buildContext);
  });
  return buildContext.code;
};
