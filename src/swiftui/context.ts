import { Modifier } from "./types/modifiers";
import { ContainerMixin, View } from "./types/views";

export interface FakeRootView {}

export class SwiftUIContext {
  // TODO: Rename to root
  rootView!: (View & ContainerMixin) | FakeRootView;
  containerHistories: (View & ContainerMixin)[] = [];

  // TODO: Rename to add(view:)
  view(view: View) {}
  adapt(modifier: Modifier) {}

  get container(): (View & ContainerMixin) | null {
    if (this.containerHistories.length <= 0) {
      return null;
    }
    return this.containerHistories[this.containerHistories.length - 1];
  }
  setContainer(container: View & ContainerMixin) {
    this.container?.children.push(container);
    this.containerHistories.push(container);
  }
  popContainer(): (View & ContainerMixin) | null {
    return this.containerHistories.pop() ?? null;
  }
}
