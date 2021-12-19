import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#ZStack", () => {
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
          };
        }),
      };
    }
  );

  test("it is component pattern. ZStack has three text", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const component = figma.createComponent();
    component.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 0.8 } }];
    component.name = "ZStack";
    component.layoutMode = "NONE";
    component.counterAxisAlignItems = "CENTER";
    component.primaryAxisAlignItems = "CENTER";
    component.paddingLeft = 0;
    component.paddingTop = 0;
    component.paddingRight = 0;
    component.paddingBottom = 0;
    component.appendChild(createText("1"));
    component.appendChild(createText("2"));
    component.appendChild(createText("3"));
    component.strokes = [];
    component.effects = [];

    const code = `
ZStack {
    Text("1")
    Text("2")
    Text("3")
}
.background(Color(red: 1, green: 1, blue: 0.80))
`;

    expect(testRun(component)).toEqual(code.slice("\n".length));
  });
});
