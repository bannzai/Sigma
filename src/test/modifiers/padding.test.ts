import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#View.padding(_:)", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // eslint-disable-next-line
  // @ts-ignore
  global.figma = figma;

  describe("padding test with vstack", () => {
    test("all padding is same value", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 20;
      vstack.paddingTop = 20;
      vstack.paddingRight = 20;
      vstack.paddingBottom = 20;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.all, 20)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("all padding values is zero", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 0;
      vstack.paddingTop = 0;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 0;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("When specify only top", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 0;
      vstack.paddingTop = 10;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 0;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.top, 10)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("When specify same value for top and left", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 10;
      vstack.paddingTop = 10;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 0;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding([.left, .top], 10)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("When specify same value for top and bottom", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 0;
      vstack.paddingTop = 10;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 10;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.vertical, 10)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("When specify same value for left and right", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 10;
      vstack.paddingTop = 0;
      vstack.paddingRight = 10;
      vstack.paddingBottom = 0;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.horizontal, 10)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });

    test("All different values", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.name = "Frame 1";
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 1;
      vstack.paddingTop = 2;
      vstack.paddingRight = 3;
      vstack.paddingBottom = 4;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));
      vstack.strokes = [];
      vstack.effects = [];

      const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.left, 1)
.padding(.top, 2)
.padding(.right, 3)
.padding(.bottom, 4)
`;
      expect(testRun(vstack)).toEqual(code.slice("\n".length));
    });
  });
});
