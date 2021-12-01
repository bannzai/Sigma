import { Modifier } from "./types/modifiers";
import { ChildrenMixin, isContainerType, View } from "./types/views";

export class SwiftUIContext {
  root!: { type: string; node: SceneNode | null };
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

  addChild(view: { type: string; node: SceneNode | null }) {
    if (this.root == null) {
      this.root = view;
    } else {
      this.container?.children.push(view);
    }
  }
}
