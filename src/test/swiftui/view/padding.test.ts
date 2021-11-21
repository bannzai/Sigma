import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "./utility";
import { createFigma } from "figma-api-stub";

describe("#HStack", async () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

  describe("padding test with vstack", () => {
    test("all padding is same value", () => {
      const vstack = figma.createFrame();
      vstack.layoutMode = "HORIZONTAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 20;
      vstack.paddingTop = 20;
      vstack.paddingRight = 20;
      vstack.paddingBottom = 20;
      vstack.itemSpacing = 10;
      vstack.appendChild(createText("1"));
      vstack.appendChild(createText("2"));
      vstack.appendChild(createText("3"));

      const context = new SwiftUIContext();
      walk(context, vstack);

      const code = `
    VStack(alignment: .leading, spacing: 10) {
        Text("1")
        Text("2")
        Text("3")
    }
    .padding(.all, 20)`;
      expect(context.code).toEqual(code.slice("\n".length));
    });
  });
});
