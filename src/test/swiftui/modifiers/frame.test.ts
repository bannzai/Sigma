import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";

describe("#View.frame(_:)", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  describe("for VStack", () => {
    describe("without parent", () => {
      describe("VStack layout align for INHERIT", () => {
        test("VStack primary and counter axis size are FIXED", async () => {
          await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

          const vstack = figma.createFrame();
          vstack.layoutMode = "VERTICAL";
          vstack.layoutAlign = "INHERIT";
          vstack.primaryAxisSizingMode = "FIXED";
          vstack.counterAxisSizingMode = "FIXED";
          vstack.counterAxisAlignItems = "MIN";
          vstack.paddingLeft = 0;
          vstack.paddingTop = 0;
          vstack.paddingRight = 0;
          vstack.paddingBottom = 0;
          vstack.itemSpacing = 10;
          vstack.resize(100, 200);
          vstack.appendChild(createText("1"));
          vstack.appendChild(createText("2"));
          vstack.appendChild(createText("3"));
          vstack.layoutGrow = 0;

          const context = new SwiftUIContext();
          walk(context, vstack);

          const code = `
VStack(alignment: .leading, spacing: 10) {
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
.frame(width: 100, height: 200)
`;
          expect(context.code).toEqual(code.slice("\n".length));
        });
      });
    });
  });
});
