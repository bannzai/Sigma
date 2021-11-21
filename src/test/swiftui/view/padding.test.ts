import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "./utility";
import { createFigma } from "figma-api-stub";

describe("#View.padding(_:)", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  describe("padding test with vstack", () => {
    test("all padding is same value", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.layoutMode = "VERTICAL";
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

    test("all padding values is zero", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 0;
      vstack.paddingTop = 0;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 0;
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
    }`;
      expect(context.code).toEqual(code.slice("\n".length));
    });

    test("When specify only top", async () => {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

      const vstack = figma.createFrame();
      vstack.layoutMode = "VERTICAL";
      vstack.counterAxisAlignItems = "MIN";
      vstack.paddingLeft = 0;
      vstack.paddingTop = 10;
      vstack.paddingRight = 0;
      vstack.paddingBottom = 0;
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
    .padding(.top, 10)`;
      expect(context.code).toEqual(code.slice("\n".length));
    });
  });
});
