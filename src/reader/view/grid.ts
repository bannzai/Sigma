import { LazyHGrid, LazyVGrid } from "../../types/views";
import { FigmaContext } from "../context";

export function walkForVGridChildren(
  _context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyVGrid
) {
  let maximumGridItemCount = 0;
  for (const child of gridNode.children) {
    if (child.type === "FRAME" && child.layoutMode === "HORIZONTAL") {
      maximumGridItemCount = Math.max(
        maximumGridItemCount,
        child.children.length
      );
    }
  }

  grid.maximumGridItemCount = maximumGridItemCount;
}

export function walkForHGridChildren(
  _context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyHGrid
) {
  let maximumGridItemCount = 0;
  for (const child of gridNode.children) {
    if (child.type === "FRAME" && child.layoutMode === "VERTICAL") {
      maximumGridItemCount = Math.max(
        maximumGridItemCount,
        child.children.length
      );
    }
  }

  grid.maximumGridItemCount = maximumGridItemCount;
}
