import { run } from "./run";

const main = async () => {
  const root = figma.currentPage.selection[0];
  const code = run(root);
  console.log(code);
  figma.closePlugin();
};

main();
