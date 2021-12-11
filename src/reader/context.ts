import { AppView } from "../types/app";
import { ChildrenMixin, isContainerType, View } from "../types/views";

export class FigmaContext {
  root!: View;
  containerHistories: (View & ChildrenMixin)[] = [];
  #appViewReferences: AppView[] = [];
  allAppViewReferences: AppView[] = [];

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

    const appComponent = this.#consumeAppComopnentContext();
    if (appComponent != null) {
      appComponent.body = container;
    } else {
      this.container?.children.push(container);
    }

    this.containerHistories.push(container);
  }
  unnestContainer(): (View & ChildrenMixin) | null {
    return this.containerHistories.pop() ?? null;
  }

  addChild(view: View) {
    if (this.root == null) {
      this.root = view;
    } else {
      const appComponent = this.#consumeAppComopnentContext();
      if (appComponent != null) {
        appComponent.body = view;
      } else {
        this.container?.children.push(view);
      }
    }
  }

  findBy(target: BaseNode): View {
    const root = this.root;

    if (root.node?.id === target.id) {
      return root;
    }

    const result = this._findBy(root, target);
    console.log(JSON.stringify({ result }));
    return result!;
  }

  _findBy(view: View, target: BaseNode): View | null {
    if (view.node?.id === target.id) {
      return view;
    }
    if (isContainerType(view)) {
      for (const child of view.children) {
        if (child.node?.id === target.id) {
          return child;
        }

        const result = this._findBy(child, target);
        if (result != null) {
          return result;
        }
      }
    }
    return null;
  }

  beginAppComponentContext(view: AppView) {
    if (isContainerType(view)) {
      this.nestContainer(view);
    } else {
      this.addChild(view);
    }

    this.#appViewReferences.push(view);
    this.allAppViewReferences.push(view);
  }
  #consumeAppComopnentContext(): AppView | null {
    return this.#appViewReferences.pop() ?? null;
  }
  countOfAppView(customAppComponentName: string): number {
    return this.allAppViewReferences.filter(
      (e) => e.originalName === customAppComponentName
    ).length;
  }
}
