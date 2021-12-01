import { ChildrenMixin, isContainerType, View } from "./types/views";

export class FigmaContext {
  root!: View;
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

  addChild(view: View) {
    if (this.root == null) {
      this.root = view;
    } else {
      this.container?.children.push(view);
    }
  }

  findBy(target: SceneNode): View {
    const root = this.root;

    if (root.node?.id === target.id) {
      return root;
    }

    return this._findBy(root, target)!;
  }

  _findBy(view: View, target: SceneNode): View | null {
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
