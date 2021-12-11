import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { testRun } from "../../run";

describe("#HStack", () => {
  const figma = createFigma({
    simulateErrors: true,
    isWithoutTimeout: false,
  });
  // @ts-ignore for some reason, need to override this for figma.mixed to work
  global.figma = figma;

  test("it is besically pattern. HStack has three text", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const hstack = figma.createFrame();
    hstack.name = "Frame 1";
    hstack.layoutMode = "HORIZONTAL";
    hstack.counterAxisAlignItems = "MIN";
    hstack.paddingLeft = 0;
    hstack.paddingTop = 0;
    hstack.paddingRight = 0;
    hstack.paddingBottom = 0;
    hstack.itemSpacing = 10;
    hstack.appendChild(createText("1"));
    hstack.appendChild(createText("2"));
    hstack.appendChild(createText("3"));

    const code = `
HStack(alignment: .top, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(testRun(hstack)).toEqual(code.slice("\n".length));
  });

  test("HStack with padding", async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const hstack = figma.createFrame();
    hstack.name = "Frame 1";
    hstack.layoutMode = "HORIZONTAL";
    hstack.counterAxisAlignItems = "MIN";
    hstack.paddingLeft = 20;
    hstack.paddingTop = 20;
    hstack.paddingRight = 20;
    hstack.paddingBottom = 20;
    hstack.itemSpacing = 10;
    hstack.appendChild(createText("1"));
    hstack.appendChild(createText("2"));
    hstack.appendChild(createText("3"));

    const code = `
HStack(alignment: .top, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.all, 20)
`;
    expect(testRun(hstack)).toEqual(code.slice("\n".length));
  });
});
