import { Modifier } from "./types/modifiers";
import { ChildrenMixin, isContainerType, View } from "./types/views";

export class SwiftUIContext {
  root!: { type: string; node: SceneNode | null };
  containerHistories: (View & ChildrenMixin)[] = [];
  currentView: View | null = null;

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

    this.currentView = container;
  }
  unnestContainer(): (View & ChildrenMixin) | null {
    const popped = this.containerHistories.pop();

    if (this.containerHistories.length > 0) {
      this.currentView =
        this.containerHistories[this.containerHistories.length - 1];
    } else {
      this.currentView = null;
    }

    return popped ?? null;
  }

  addChild(view: View) {
    if (this.root == null) {
      this.root = view;
    } else {
      this.container?.children.push(view);
    }

    this.currentView = view;
  }
}
