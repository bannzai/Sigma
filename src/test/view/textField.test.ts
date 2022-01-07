import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";
import { codePlaceholder } from "../../builder/codePlaceholder";

describe("#TextField", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // eslint-disable-next-line
  // @ts-ignore
  global.figma = figma;

  test("it is besically pattern. For Text TextField", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const textField = figma.createFrame();
    textField.name = "SwiftUI::TextField";
    textField.paddingBottom = 0;
    textField.paddingLeft = 0;
    textField.paddingTop = 0;
    textField.paddingRight = 0;
    textField.appendChild(createText("1"));
    textField.strokes = [];
    textField.effects = [];

    const key = codePlaceholder("1", "LocalizedStringKey");
    const binding = codePlaceholder("Binding<String>");
    const code = `
TextField(${key}, text: ${binding})
`;
    expect(testRun(textField)).toEqual(code.slice("\n".length));
  });

  test("TextField with style", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const textField = figma.createFrame();
    textField.name = "SwiftUI::TextField#PrimaryTextFieldStyle";
    textField.paddingBottom = 0;
    textField.paddingLeft = 0;
    textField.paddingTop = 0;
    textField.paddingRight = 0;
    textField.appendChild(createText("1"));
    textField.strokes = [];
    textField.effects = [];

    const key = codePlaceholder("1", "LocalizedStringKey");
    const binding = codePlaceholder("Binding<String>");
    const code = `
TextField(${key}, text: ${binding})
    .textFieldStyle(PrimaryTextFieldStyle())
`;
    expect(testRun(textField)).toEqual(code.slice("\n".length));
  });
});
