import { createFigma } from "figma-api-stub";
import { run } from "../../run";

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

    const code = `
Image("image")
    .resizable()
`;
    expect(run(rectangle)).toEqual(code.slice("\n".length));
  });

  test("Image for scaleMode to FILL", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "image";
    rectangle.strokes = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: "" }];

    const code = `
Image("image")
`;
    expect(run(rectangle)).toEqual(code.slice("\n".length));
  });
});
