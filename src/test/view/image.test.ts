import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

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
    rectangle.effects = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: "" }];

    const code = `
Image("image")
    .resizable()
`;
    expect(testRun(rectangle)).toEqual(code.slice("\n".length));
  });

  test("Image for scaleMode to FILL", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "image";
    rectangle.strokes = [];
    rectangle.effects = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: "" }];

    const code = `
Image("image")
`;
    expect(testRun(rectangle)).toEqual(code.slice("\n".length));
  });

  test("Image with special marker for SFSymbol", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "SFSymbols#star";
    rectangle.strokes = [];
    rectangle.effects = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: "" }];

    const code = `
Image(systemName: "star")
`;
    expect(testRun(rectangle)).toEqual(code.slice("\n".length));
  });

  test("Image fo SwiftUI::AsyncIamge", async () => {
    const rectangle = figma.createRectangle();
    rectangle.name = "SwiftUI::AsyncImage";
    rectangle.strokes = [];
    rectangle.effects = [];
    rectangle.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: "" }];

    const code = `
AsyncImage(url: URL(string: "https://picsum.photos/seed/picsum/200/300")!) { phase in
    switch phase {
    case .success(let image):
        image
            .resizable()
    case _:
        ProgressView()
    }
}
`;
    expect(testRun(rectangle)).toEqual(code.slice("\n".length));
  });
});
