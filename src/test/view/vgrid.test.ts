import { createText, createHStack, createVStack } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#LazyVGrid", () => {
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

  test("it is besically pattern. LazyVGrid has single Horizontal layout element", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "VERTICAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createHStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });

  test("it is besically pattern. LazyVGrid has plural Horizontal layout element", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "VERTICAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createHStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.appendChild(
      createHStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.appendChild(
      createHStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Text("1")
    Text("2")
    Text("3")
    Text("1")
    Text("2")
    Text("3")
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });
});
