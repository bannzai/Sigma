const assert = require("assert");
import { BuildContext, BuildContextOption } from "./builder/context";
import { build, buildBody } from "./builder/entrypoint";
import { FigmaContext } from "./reader/context";
import { traverse } from "./reader/entrypoint";

export const run = (root: SceneNode, option?: BuildContextOption): string => {
  const figmaContext = new FigmaContext();
  const body = findBody(root);
  if (body != null) {
    traverse(figmaContext, body);
  } else {
    traverse(figmaContext, root);
  }
  assert(figmaContext.root != null, "it is necessary root");

  const buildContext = new BuildContext();
  buildContext.option = option;
  buildContext.current = figmaContext.root;
  build(buildContext);

  if (figmaContext.allAppViewReferences.length > 0) {
    buildContext.lineBreak();
    figmaContext.allAppViewReferences.forEach((e) => {
      if (e.node?.id !== root.id) {
        buildContext.current = e;
        build(buildContext);
        buildContext.lineBreak();
      }
    });
  }
  return buildContext.code;
};

export const testRun = (root: SceneNode): string => {
  return run(root, {
    isGenerateOnlyView: true,
  });
};

function isContainerType(node: any): node is ChildrenMixin {
  return (node as ChildrenMixin).children !== undefined;
}

function findBody(node: SceneNode): SceneNode | null {
  if (node.name === "Sigma@Body") {
    return node;
  }
  if (isContainerType(node)) {
    for (const chlid of node.children) {
      const value = findBody(chlid);
      if (value != null) {
        return value;
      }
    }
  }
  return null;
}
