import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walks/walk";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";

describe("#Image", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  test("Image for scaleMode to FIT", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "image";
    rectangle.strokes = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: "" }];

    const context = new SwiftUIContext();
    walk(context, rectangle);

    const code = `
Image("image")
    .resizable()
`;
    expect(context.code).toEqual(code.slice("\n".length));
  });

  test("Image for scaleMode to FILL", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "image";
    rectangle.strokes = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: "" }];

    const context = new SwiftUIContext();
    walk(context, rectangle);

    const code = `
Image("image")
`;
    expect(context.code).toEqual(code.slice("\n".length));
  });
});
