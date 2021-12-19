import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#VStack", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
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

  test("it is besically pattern. VStack has three text", async () => {
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

  test("VStack with padding", async () => {
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

  test("it is component child pattern", async () => {
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

    const component = figma.createComponent();
    component.name = "";
    component.strokes = [];
    component.effects = [];
    component.appendChild(vstack);

    const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.all, 20)
`;
    expect(testRun(component)).toEqual(code.slice("\n".length));
  });
});
