import * as assert from "assert";
import { Modifier } from "./types/modifiers";
import { Shape } from "./types/shape";
import { ChildrenMixin, isContainerType, View } from "./types/views";

export class SwiftUIContext {
  root!: View | Shape;
  containerHistories: (View & ChildrenMixin)[] = [];

  get container(): (View & ChildrenMixin) | null {
    if (this.containerHistories.length <= 0) {
      return null;
    }
    return this.containerHistories[this.containerHistories.length - 1];
  }
  nestContainer(container: View & ChildrenMixin) {
    if (this.root == null) {
      this.root = container;
    }
    this.container?.children.push(container);
    this.containerHistories.push(container);
  }
  unnestContainer(): (View & ChildrenMixin) | null {
    return this.containerHistories.pop() ?? null;
  }

  addChild(view: View | Shape) {
    if (this.root == null) {
      this.root = view;
    } else {
      this.container?.children.push(view);
    }
  }

  findBy(target: SceneNode): View | Shape {
    const root = this.root;

    assert(root != null);
    if (root.node?.id === target.id) {
      return root;
    }

    return this._findBy(root, target)!;
  }

  _findBy(view: View | Shape, target: SceneNode): View | Shape | null {
    if (isContainerType(view)) {
      for (const child of view.children) {
        if (child.node?.id === target.id) {
          return child;
        }
        if (isContainerType(child) && child.node != null) {
          const result = this._findBy(child, target);
          if (result != null) {
            return result;
          }
        }
      }
    }
    return null;
  }
}
