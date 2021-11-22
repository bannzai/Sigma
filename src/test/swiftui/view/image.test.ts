import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
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
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const rectangle = figma.createRectangle();
    rectangle.name = "image";
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: "" }];

    const context = new SwiftUIContext();
    walk(context, rectangle);

    const code = `
Image("image")
    .resizable()
`;
    expect(context.code).toEqual(code.slice("\n".length));
  });
});
