import { SwiftUIContext } from "../../../swiftui/context";
import { walk } from "../../../swiftui/walkers/walkers";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";

describe("#VStack", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  test("it is besically pattern. VStack has three text", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "Frame 1";
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
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
`;
    expect(context.code).toEqual(code.slice("\n".length));
  });

  test("VStack with padding", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const vstack = figma.createFrame();
    vstack.name = "Frame 1";
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
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
.padding(.all, 20)
`;
    expect(context.code).toEqual(code.slice("\n".length));
  });
});
