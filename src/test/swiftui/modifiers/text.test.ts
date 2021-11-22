import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";

describe("Text.modifier(ANY_MODIFIER)", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  describe("#foregroundColor", () => {
    test("without alpha", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.characters = "Hello";
      text.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 0 } }];

      const context = new SwiftUIContext();
      walk(context, text);

      const code = `
    Text("Hello")
        .foregroundColor(Color(red: 1, green: 1, blue: 0))`;
      expect(context.code).toEqual(code.slice("\n".length));
    });
  });
});
