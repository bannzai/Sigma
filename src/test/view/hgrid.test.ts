import { createText, createHStack, createVStack } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#LazyHGrid", () => {
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

  test("it is besically pattern. LazyHGrid has single Horizontal layout element", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "HORIZONTAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createVStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyHGrid(rows: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });

  test("it is besically pattern. LazyHGrid has plural Horizontal layout element", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "HORIZONTAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createVStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.appendChild(
      createVStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.appendChild(
      createVStack(createText("1"), createText("2"), createText("3"))
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyHGrid(rows: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
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

  test("LazyHGrid with Section. Section contains header ", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "HORIZONTAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createHStack(
        createText("Header"),
        createVStack(createText("1"), createText("2"), createText("3"))
      )
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyHGrid(rows: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Section(header: Text("Header")) {
        Text("1")
        Text("2")
        Text("3")
    }
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });

  test("LazyHGrid with Section. Section contains footer ", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "HORIZONTAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createHStack(
        createVStack(createText("1"), createText("2"), createText("3")),
        createText("Footer")
      )
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyHGrid(rows: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Section(footer: Text("Footer")) {
        Text("1")
        Text("2")
        Text("3")
    }
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });

  test("LazyHGrid with Section. Section contains header and footer ", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vgrid = figma.createFrame();
    vgrid.name = "SwiftUI::Grid";
    vgrid.layoutMode = "HORIZONTAL";
    vgrid.counterAxisAlignItems = "MIN";
    vgrid.paddingLeft = 0;
    vgrid.paddingTop = 0;
    vgrid.paddingRight = 0;
    vgrid.paddingBottom = 0;
    vgrid.itemSpacing = 10;
    vgrid.appendChild(
      createHStack(
        createText("Header"),
        createVStack(createText("1"), createText("2"), createText("3")),
        createText("Footer")
      )
    );
    vgrid.strokes = [];
    vgrid.effects = [];

    const code = `
LazyHGrid(rows: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]) {
    Section(header: Text("Header"), footer: Text("Footer")) {
        Text("1")
        Text("2")
        Text("3")
    }
}
`;
    expect(testRun(vgrid)).toEqual(code.slice("\n".length));
  });
});
