import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#Button", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  test("it is besically pattern. For Text Button", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const button = figma.createFrame();
    button.name = "SwiftUI::Button";
    button.paddingBottom = 0;
    button.paddingLeft = 0;
    button.paddingTop = 0;
    button.paddingRight = 0;
    button.appendChild(createText("1"));
    button.strokes = [];
    button.effects = [];

    const code = `
Button(action: { /* TODO */ }) {
    Text("1")
}
`;
    expect(testRun(button)).toEqual(code.slice("\n".length));
  });

  test("Button with style", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const button = figma.createFrame();
    button.name = "SwiftUI::Button#PrimaryButtonStyle";
    button.paddingBottom = 0;
    button.paddingLeft = 0;
    button.paddingTop = 0;
    button.paddingRight = 0;
    button.appendChild(createText("1"));
    button.strokes = [];
    button.effects = [];

    const code = `
Button(action: { /* TODO */ }) {
    Text("1")
}
.buttonStyle(PrimaryButtonStyle())
`;
    expect(testRun(button)).toEqual(code.slice("\n".length));
  });
});
