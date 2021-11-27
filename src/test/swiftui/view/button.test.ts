import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";

describe("#Button", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  test("it is besically pattern. For Text Button", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const button = figma.createFrame();
    button.appendChild(createText("1"));
    button.name = "SwiftUI::Button";

    const context = new SwiftUIContext();
    walk(context, button);

    const code = `
Button(action: { /* TODO */ }) {
    Text(verbatim: "1")
}`;
    expect(context.code).toEqual(code.slice("\n".length));
  });
});
