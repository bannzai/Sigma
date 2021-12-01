import { FigmaContext } from "../../reader/context";
import { walk } from "../../reader/entrypoint";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { run } from "../../run";

describe("Text.modifier(ANY_MODIFIER)", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  describe("#underline", () => {
    test("node.textDecoration is UNDERLINE", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.name = "Text 1";
      text.characters = "Hello";
      text.textDecoration = "UNDERLINE";
      text.fills = [];

      const code = `
Text("Hello")
    .underline()
`;
      expect(run(text)).toEqual(code.slice("\n".length));
    });
  });

  describe("#strikethrough", () => {
    test("node.textDecoration is STRIKETHROUGH", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.name = "Text 1";
      text.characters = "Hello";
      text.textDecoration = "STRIKETHROUGH";
      text.fills = [];

      const code = `
Text("Hello")
    .strikethrough()
`;
      expect(run(text)).toEqual(code.slice("\n".length));
    });
  });

  describe("#foregroundColor", () => {
    test("without opacity", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.name = "Text 1";
      text.characters = "Hello";
      text.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 0 } }];

      const code = `
Text("Hello")
    .foregroundColor(Color(red: 1, green: 1, blue: 0))
`;
      expect(run(text)).toEqual(code.slice("\n".length));
    });

    test("with opacity", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.name = "Text 1";
      text.characters = "Hello";
      text.fills = [
        { type: "SOLID", color: { r: 1, g: 1, b: 0 }, opacity: 0.1 },
      ];

      const code = `
Text("Hello")
    .foregroundColor(Color(red: 1, green: 1, blue: 0, opacity: 0.1))
`;
      expect(run(text)).toEqual(code.slice("\n".length));
    });
  });

  describe("combined some modifiers", () => {
    test("", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const text = figma.createText();
      text.name = "Text 1";
      text.characters = "Hello";
      text.textDecoration = "STRIKETHROUGH";
      text.fills = [
        { type: "SOLID", color: { r: 1, g: 1, b: 0 }, opacity: 0.1 },
      ];

      const code = `
Text("Hello")
    .strikethrough()
    .foregroundColor(Color(red: 1, green: 1, blue: 0, opacity: 0.1))
`;
      expect(run(text)).toEqual(code.slice("\n".length));
    });
  });
});
