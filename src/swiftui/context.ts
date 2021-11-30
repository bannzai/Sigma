import { Modifier } from "./types/modifiers";
import { ChildrenMixin, View } from "./types/views";

export interface FakeRootView {
  readonly isFake: true;
}
export const isFakeRootView = (args: any): args is FakeRootView =>
  "isFake" in args && args.isFake === true;

export class SwiftUIContext {
  root: (View & ChildrenMixin) | FakeRootView = {} as FakeRootView;
  containerHistories: (View & ChildrenMixin)[] = [];

  get container(): (View & ChildrenMixin) | null {
    if (this.containerHistories.length <= 0) {
      return null;
    }
    return this.containerHistories[this.containerHistories.length - 1];
  }
  nestContainer(container: View & ChildrenMixin) {
    if (isFakeRootView(this.root)) {
      this.root = container;
    }
    this.container?.children.push(container);
    this.containerHistories.push(container);
  }
  unnestContainer(): (View & ChildrenMixin) | null {
    return this.containerHistories.pop() ?? null;
  }

  addChild(view: { type: string }) {
    this.container?.children.push(view);
  }
  adapt(modifier: Modifier) {}
}
