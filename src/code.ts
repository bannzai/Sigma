import { run } from "./run";

figma.showUI(__html__, { width: 480, height: 480 });

const main = async () => {
  const root = figma.currentPage.selection[0];
  const code = run(root);
  console.log(code);
  figma.ui.postMessage({
    code,
  });
};

main();
