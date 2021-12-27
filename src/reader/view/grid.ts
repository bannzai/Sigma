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
  context.beginGridContext(grid);

  gridNode.children.forEach((gridNodeChild) => {
    if (gridNodeChild.type !== "FRAME" || gridNodeChild.children.length <= 0) {
      return;
    }

    if (gridNodeChild.layoutMode === "HORIZONTAL") {
      grid.maximumGridItemCount = Math.max(
        grid.maximumGridItemCount,
        gridNodeChild.children.length
      );

      gridNodeChild.children.forEach((childForSkipHStack) => {
        traverse(context, childForSkipHStack);
      });
    } else if (gridNodeChild.layoutMode === "VERTICAL") {
      const section: Section = {
        type: "Section",
        modifiers: [],
        node: gridNodeChild,
        children: [],
      };

      context.nest(section, () => {
        gridNodeChild.children.forEach((sectionChild, index) => {
          const isHStack =
            sectionChild.type === "FRAME" &&
            sectionChild.layoutMode === "HORIZONTAL";

          if (isHStack) {
            grid.maximumGridItemCount = Math.max(
              grid.maximumGridItemCount,
              sectionChild.children.length
            );

            sectionChild.children.forEach((gridElement) => {
              traverse(context, gridElement);
            });
          } else {
            traverse(context, sectionChild);

            if (index === 0) {
              const header = section.children.pop();
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
  });

  context.endGridContext();
}

export function walkForHGridChildren(
  context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyHGrid
) {
  trace("#walkForHGridChildren", context, gridNode);
  context.beginGridContext(grid);

  gridNode.children.forEach((gridNodeChild) => {
    if (gridNodeChild.type !== "FRAME" || gridNodeChild.children.length <= 0) {
      return;
    }

    if (gridNodeChild.layoutMode === "VERTICAL") {
      grid.maximumGridItemCount = Math.max(
        grid.maximumGridItemCount,
        gridNodeChild.children.length
      );

      gridNodeChild.children.forEach((childForSkipHStack) => {
        traverse(context, childForSkipHStack);
      });
    } else if (gridNodeChild.layoutMode === "HORIZONTAL") {
      const section: Section = {
        type: "Section",
        modifiers: [],
        node: gridNodeChild,
        children: [],
      };

      context.nest(section, () => {
        gridNodeChild.children.forEach((sectionChild, index) => {
          const isVStack =
            sectionChild.type === "FRAME" &&
            sectionChild.layoutMode === "VERTICAL";

          if (isVStack) {
            grid.maximumGridItemCount = Math.max(
              grid.maximumGridItemCount,
              sectionChild.children.length
            );

            sectionChild.children.forEach((gridElement) => {
              traverse(context, gridElement);
            });
          } else {
            traverse(context, sectionChild);

            if (index === 0) {
              const header = section.children.pop();
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
  });

  context.endGridContext();
}
