import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#List", () => {
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

  test("vertical List", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "SwiftUI::List";
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
List {
    Text("1")
    Text("2")
    Text("3")
}
.listStyle(PlainListStyle())
`;
    expect(testRun(vstack)).toEqual(code.slice("\n".length));
  });

  test("horizontal List", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "SwiftUI::List";
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
List {
    Text("1")
    Text("2")
    Text("3")
}
.listStyle(PlainListStyle())
`;
    expect(testRun(vstack)).toEqual(code.slice("\n".length));
  });

  test("default List axis", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "SwiftUI::List";
    vstack.layoutMode = "NONE";
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
List {
    Text("1")
    Text("2")
    Text("3")
}
.listStyle(PlainListStyle())
`;
    expect(testRun(vstack)).toEqual(code.slice("\n".length));
  });
});
