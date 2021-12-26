import { LazyHGrid, LazyVGrid, Section } from "../../types/views";
import { FigmaContext } from "../context";
import { traverse } from "../entrypoint";
import { trace } from "../tracer";

export function walkForVGridChildren(
  context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyVGrid
) {
  trace("#walkForVGridChildren", context, gridNode);
  gridNode.children.forEach((gridNodeChild) => {
    if (gridNodeChild.type === "FRAME" && gridNodeChild.children.length > 0) {
      if (gridNodeChild.layoutMode === "HORIZONTAL") {
        grid.maximumGridItemCount = Math.max(
          grid.maximumGridItemCount,
          gridNodeChild.children.length
        );

        context.beginGridContext(grid);
        gridNodeChild.children.forEach((childForSkipHStack) => {
          traverse(context, childForSkipHStack);
        });
        context.endGridContext();
      } else if (gridNodeChild.layoutMode === "VERTICAL") {
        const section: Section = {
          type: "Section",
          modifiers: [],
          node: gridNodeChild,
          children: [],
        };
        grid.children.push(section);

        context.nest(section, () => {
          gridNodeChild.children.forEach((sectionChild, index) => {
            const shouldFoldWhenSectionChildIsHStack =
              sectionChild.type === "FRAME" &&
              sectionChild.layoutMode === "HORIZONTAL";

            if (shouldFoldWhenSectionChildIsHStack) {
              sectionChild.children.forEach((gridElement) => {
                traverse(context, gridElement);
              });
            } else {
              traverse(context, sectionChild);

              if (index === 0) {
                const header = section.children.shift();
                if (header != null) {
                  section.header = header;
                }
              } else if (index === gridNodeChild.children.length - 1) {
                const footer = section.children.pop();
                if (footer != null) {
                  section.footer = footer;
                }
              }
            }
          });
        });
      }
    }
  });
}

export function walkForHGridChildren(
  context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyHGrid
) {
  trace("#walkForHGridChildren", context, gridNode);
  gridNode.children.forEach((gridNodeChild) => {
    if (gridNodeChild.type === "FRAME" && gridNodeChild.children.length > 0) {
      if (gridNodeChild.layoutMode === "VERTICAL") {
        grid.maximumGridItemCount = Math.max(
          grid.maximumGridItemCount,
          gridNodeChild.children.length
        );

        context.beginGridContext(grid);
        gridNodeChild.children.forEach((childForSkipVStack) => {
          traverse(context, childForSkipVStack);
        });
        context.endGridContext();
      } else if (gridNodeChild.layoutMode === "HORIZONTAL") {
        const section: Section = {
          type: "Section",
          modifiers: [],
          node: gridNodeChild,
          children: [],
        };
        grid.children.push(section);

        context.nest(section, () => {
          gridNodeChild.children.forEach((sectionChild, index) => {
            const shouldFoldWhenSectionChildIsHStack =
              sectionChild.type === "FRAME" &&
              sectionChild.layoutMode === "VERTICAL";

            if (shouldFoldWhenSectionChildIsHStack) {
              sectionChild.children.forEach((gridElement) => {
                traverse(context, gridElement);
              });
            } else {
              traverse(context, sectionChild);

              if (index === 0) {
                const header = section.children.shift();
                if (header != null) {
                  section.header = header;
                }
              } else if (index === gridNodeChild.children.length - 1) {
                const footer = section.children.pop();
                if (footer != null) {
                  section.footer = footer;
                }
              }
            }
          });
        });
      }
    }
  });
}
