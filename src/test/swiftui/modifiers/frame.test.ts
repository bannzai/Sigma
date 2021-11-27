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
    describe("with VStack parent", () => {
      describe("case for primary axis layout grow", () => {
        describe("layoutGrow is 0", () => {
          test("child VStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "FIXED";
            vstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to VStack
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

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(height: 200)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutGrow is 1", () => {
          test("child VStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "FIXED";
            vstack.counterAxisSizingMode = "AUTO"; // Avoid to add .frame(width:) to child VStack
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
            vstack.layoutGrow = 1;

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxHeight: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
      describe("case for counter axis stretch patern", () => {
        describe("layoutAlign is INHERIT", () => {
          test("child VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
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
            vstack.layoutAlign = "INHERIT";

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(width: 100)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutAlign is STRETCH", () => {
          test("child VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            vstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
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
            vstack.layoutAlign = "STRETCH";

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxWidth: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
    });
    describe("with HStack parent", () => {
      describe("case for primary axis layout grow", () => {
        describe("layoutGrow is 0", () => {
          test("child VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
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

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(width: 100)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutGrow is 1", () => {
          test("child VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "AUTO"; // Avoid to add .frame(width:) to child VStack
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
            vstack.layoutGrow = 1;

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxWidth: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
      describe("case for counter axis stretch patern", () => {
        describe("layoutAlign is INHERIT", () => {
          test("child VStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "FIXED";
            vstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
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
            vstack.layoutAlign = "INHERIT";

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(height: 200)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutAlign is STRETCH", () => {
          test("child VStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const vstack = figma.createFrame();
            vstack.layoutMode = "VERTICAL";
            vstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            vstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
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
            vstack.layoutAlign = "STRETCH";

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(vstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    VStack(alignment: .leading, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxHeight: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
    });
    describe("without parent", () => {
      test("VStack primary axis size is FIXED and counter axis size is FIXED", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const vstack = figma.createFrame();
        vstack.layoutMode = "VERTICAL";
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

      test("VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const vstack = figma.createFrame();
        vstack.layoutMode = "VERTICAL";
        vstack.primaryAxisSizingMode = "AUTO";
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

        const context = new SwiftUIContext();
        walk(context, vstack);

        const code = `
VStack(alignment: .leading, spacing: 10) {
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
.frame(width: 100)
`;
        expect(context.code).toEqual(code.slice("\n".length));
      });

      test("VStack primary axis size is AUTO and counter axis size is AUTO", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const vstack = figma.createFrame();
        vstack.layoutMode = "VERTICAL";
        vstack.primaryAxisSizingMode = "AUTO";
        vstack.counterAxisSizingMode = "AUTO";
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
    });
  });

  describe("for HStack", () => {
    describe("with VStack parent", () => {
      describe("case for primary axis layout grow", () => {
        describe("layoutGrow is 0", () => {
          test("child HStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "FIXED";
            hstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child HStack
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(width: 100)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutGrow is 1", () => {
          test("child HStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add .frame(width:) to child VStack
            hstack.counterAxisSizingMode = "FIXED";
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 1;

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxHeight: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
      describe("case for counter axis stretch patern", () => {
        describe("layoutAlign is INHERIT", () => {
          test("child HStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            hstack.counterAxisSizingMode = "FIXED";
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;
            hstack.layoutAlign = "INHERIT";

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(height: 200)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutAlign is STRETCH", () => {
          test("child HStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            hstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;
            hstack.layoutAlign = "STRETCH";

            const parent = figma.createFrame();
            parent.layoutMode = "VERTICAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
VStack(alignment: .leading, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxWidth: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
    });
    describe("with HStack parent", () => {
      describe("case for primary axis layout grow", () => {
        describe("layoutGrow is 0", () => {
          test("child VStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            hstack.counterAxisSizingMode = "FIXED";
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(height: 200)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutGrow is 1", () => {
          test("child HStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "FIXED";
            hstack.counterAxisSizingMode = "AUTO"; // Avoid to add .frame(width:) to child VStack
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 1;

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxWidth: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
      describe("case for counter axis stretch patern", () => {
        describe("layoutAlign is INHERIT", () => {
          test("child HStack primary axis size is AUTO and counter axis size is FIXED", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child HStack
            hstack.counterAxisSizingMode = "FIXED";
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;
            hstack.layoutAlign = "INHERIT";

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(height: 200)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
        describe("layoutAlign is STRETCH", () => {
          test("child HStack primary axis size is FIXED and counter axis size is AUTO", async () => {
            await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

            const hstack = figma.createFrame();
            hstack.layoutMode = "HORIZONTAL";
            hstack.primaryAxisSizingMode = "AUTO"; // Avoid to add `.frame(height:) to child VStack
            hstack.counterAxisSizingMode = "AUTO"; // Avoid to add `.frame(width:) to child VStack
            hstack.counterAxisAlignItems = "MIN";
            hstack.paddingLeft = 0;
            hstack.paddingTop = 0;
            hstack.paddingRight = 0;
            hstack.paddingBottom = 0;
            hstack.itemSpacing = 10;
            hstack.resize(100, 200);
            hstack.appendChild(createText("1"));
            hstack.appendChild(createText("2"));
            hstack.appendChild(createText("3"));
            hstack.layoutGrow = 0;
            hstack.layoutAlign = "STRETCH";

            const parent = figma.createFrame();
            parent.layoutMode = "HORIZONTAL";
            // Any values: BEGIN
            parent.primaryAxisSizingMode = "FIXED";
            parent.counterAxisSizingMode = "FIXED";
            parent.counterAxisAlignItems = "MIN";
            parent.paddingLeft = 0;
            parent.paddingTop = 0;
            parent.paddingRight = 0;
            parent.paddingBottom = 0;
            parent.itemSpacing = 10;
            parent.resize(300, 400);
            // Any values: END
            parent.appendChild(hstack);
            parent.appendChild(createText("4"));

            const context = new SwiftUIContext();
            walk(context, parent);

            const code = `
HStack(alignment: .top, spacing: 10) {
    HStack(alignment: .top, spacing: 10) {
        Text(verbatim: "1")
        Text(verbatim: "2")
        Text(verbatim: "3")
    }
    .frame(maxHeight: .infinity)
    Text(verbatim: "4")
}
.frame(width: 300, height: 400)
`;
            expect(context.code).toEqual(code.slice("\n".length));
          });
        });
      });
    });
    describe("without parent", () => {
      test("HStack primary axis size is FIXED and counter axis size is FIXED", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const hstack = figma.createFrame();
        hstack.layoutMode = "HORIZONTAL";
        hstack.primaryAxisSizingMode = "FIXED";
        hstack.counterAxisSizingMode = "FIXED";
        hstack.counterAxisAlignItems = "MIN";
        hstack.paddingLeft = 0;
        hstack.paddingTop = 0;
        hstack.paddingRight = 0;
        hstack.paddingBottom = 0;
        hstack.itemSpacing = 10;
        hstack.resize(100, 200);
        hstack.appendChild(createText("1"));
        hstack.appendChild(createText("2"));
        hstack.appendChild(createText("3"));

        const context = new SwiftUIContext();
        walk(context, hstack);

        const code = `
HStack(alignment: .top, spacing: 10) {
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
.frame(width: 100, height: 200)
`;
        expect(context.code).toEqual(code.slice("\n".length));
      });

      test("HStack primary axis size is AUTO and counter axis size is FIXED", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const hstack = figma.createFrame();
        hstack.layoutMode = "HORIZONTAL";
        hstack.primaryAxisSizingMode = "AUTO";
        hstack.counterAxisSizingMode = "FIXED";
        hstack.counterAxisAlignItems = "MIN";
        hstack.paddingLeft = 0;
        hstack.paddingTop = 0;
        hstack.paddingRight = 0;
        hstack.paddingBottom = 0;
        hstack.itemSpacing = 10;
        hstack.resize(100, 200);
        hstack.appendChild(createText("1"));
        hstack.appendChild(createText("2"));
        hstack.appendChild(createText("3"));

        const context = new SwiftUIContext();
        walk(context, hstack);

        const code = `
HStack(alignment: .top, spacing: 10) {
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
.frame(height: 200)
`;
        expect(context.code).toEqual(code.slice("\n".length));
      });

      test("HStack primary axis size is AUTO and counter axis size is AUTO", async () => {
        await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

        const hstack = figma.createFrame();
        hstack.layoutMode = "HORIZONTAL";
        hstack.primaryAxisSizingMode = "AUTO";
        hstack.counterAxisSizingMode = "AUTO";
        hstack.counterAxisAlignItems = "MIN";
        hstack.paddingLeft = 0;
        hstack.paddingTop = 0;
        hstack.paddingRight = 0;
        hstack.paddingBottom = 0;
        hstack.itemSpacing = 10;
        hstack.resize(100, 200);
        hstack.appendChild(createText("1"));
        hstack.appendChild(createText("2"));
        hstack.appendChild(createText("3"));

        const context = new SwiftUIContext();
        walk(context, hstack);

        const code = `
HStack(alignment: .top, spacing: 10) {
    Text(verbatim: "1")
    Text(verbatim: "2")
    Text(verbatim: "3")
}
`;
        expect(context.code).toEqual(code.slice("\n".length));
      });
    });
  });
});
