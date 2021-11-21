import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";

describe("#VStack", () => {
  context("it is besically pattern. VStack has three text", () => {
    it("", () => {
      const vstack = figma.createFrame();
      vstack.layoutMode = "VERTICAL";
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));

      const context = new SwiftUIContext();
      walk(context, vstack);

      context.code = `
VStack(alignment: .leading, spacing: 0) {
   Text("1")
   Text("2")
   Text("3")
}
      `;
    });
  });
});

const createText = (text: string): TextNode => {
  const node = figma.createText();
  node.characters = text;
  return node;
};
