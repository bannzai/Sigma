import { FigmaContext } from "../../../figma/context";
import { walk } from "../../../figma/walk";
import { createText } from "../utility/utility";
import { createFigma } from "figma-api-stub";
import { run } from "../../../run";

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

    const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
`;
    expect(run(vstack)).toEqual(code.slice("\n".length));
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

    const code = `
VStack(alignment: .leading, spacing: 10) {
    Text("1")
    Text("2")
    Text("3")
}
.padding(.all, 20)
`;
    expect(run(vstack)).toEqual(code.slice("\n".length));
  });
});
