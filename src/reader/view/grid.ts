import { LazyHGrid, LazyVGrid } from "../../types/views";
import { FigmaContext } from "../context";

export function walkForVGridChildren(
  _context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyVGrid
) {
  let maximumChildrenCount = 0;
  for (const child of gridNode.children) {
    if (child.type === "FRAME" && child.layoutMode === "HORIZONTAL") {
      maximumChildrenCount = Math.max(
        maximumChildrenCount,
        child.children.length
      );
    }
  }

  grid.maximumChildrenCount = maximumChildrenCount;
}

export function walkForHGridChildren(
  _context: FigmaContext,
  gridNode: FrameNode,
  grid: LazyHGrid
) {
  let maximumChildrenCount = 0;
  for (const child of gridNode.children) {
    if (child.type === "FRAME" && child.layoutMode === "VERTICAL") {
      maximumChildrenCount = Math.max(
        maximumChildrenCount,
        child.children.length
      );
    }
  }

  grid.maximumChildrenCount = maximumChildrenCount;
}
