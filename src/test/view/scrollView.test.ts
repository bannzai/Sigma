import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#ScrollView", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // eslint-disable-next-line
  // @ts-ignore
  global.figma = figma;
  jest.mock(
    "../../../node_modules/@figma/plugin-typings/plugin-api.d.ts",
    () => {
      return {
        __esModule: true,
        createComponent: jest.fn(() => {
          return {
            type: "COMPONENT",
            remote: false,
            strokes: [],
          };
        }),
      };
    }
  );

  test("vertical ScrollView", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "SwiftUI::ScrollView";
    vstack.layoutMode = "VERTICAL";
    vstack.counterAxisAlignItems = "MIN";
    vstack.paddingLeft = 0;
    vstack.paddingTop = 0;
    vstack.paddingRight = 0;
    vstack.paddingBottom = 0;
    vstack.itemSpacing = 0;
    vstack.appendChild(createText("1"));
    vstack.appendChild(createText("2"));
    vstack.appendChild(createText("3"));
    vstack.strokes = [];
    vstack.effects = [];

    const code = `
ScrollView(.vertical) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(vstack)).toEqual(code.slice("\n".length));
  });

  test("horizontal ScrollView", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "SwiftUI::ScrollView";
    vstack.layoutMode = "HORIZONTAL";
    vstack.counterAxisAlignItems = "MIN";
    vstack.paddingLeft = 0;
    vstack.paddingTop = 0;
    vstack.paddingRight = 0;
    vstack.paddingBottom = 0;
    vstack.itemSpacing = 0;
    vstack.appendChild(createText("1"));
    vstack.appendChild(createText("2"));
    vstack.appendChild(createText("3"));
    vstack.strokes = [];
    vstack.effects = [];

    const code = `
ScrollView(.horizontal) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(vstack)).toEqual(code.slice("\n".length));
  });
});
