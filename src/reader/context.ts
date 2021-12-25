import { AppView, AppViewInfo } from "../types/app";
import {
  Button,
  ChildrenMixin,
  isContainerType,
  LazyHGrid,
  LazyVGrid,
  View,
} from "../types/views";

export class FigmaContext {
  root!: View;
  containerHistories: (View & ChildrenMixin)[] = [];
  #appViewInfoList: AppViewInfo[] = [];
  allAppViewReferences: AppView[] = [];

  get container(): (View & ChildrenMixin) | null {
    if (this.containerHistories.length <= 0) {
      return null;
    }
    return this.containerHistories[this.containerHistories.length - 1];
  }
  nestContainer(container: View & ChildrenMixin) {
    this.#associateCurrentContextAppComponentBody(container);

    if (this.root == null) {
      this.root = container;
    }
    this.container?.children.push(container);
    this.containerHistories.push(container);
  }
  unnestContainer(): (View & ChildrenMixin) | null {
    return this.containerHistories.pop() ?? null;
  }

  beginButtonContext(button: Button) {
    this.nestContainer(button);
  }
  endButtonContext(): (View & ChildrenMixin) | null {
    return this.unnestContainer();
  }

  beginGridContext(grid: LazyVGrid | LazyHGrid) {
    this.nestContainer(grid);
  }
  endGridContext(): (View & ChildrenMixin) | null {
    return this.unnestContainer();
  }

  addChild(view: View) {
    this.#associateCurrentContextAppComponentBody(view);

    if (this.root == null) {
      this.root = view;
    } else {
      this.container?.children.push(view);
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

  beginAppComponentContext(view: AppViewInfo) {
    this.#appViewInfoList.push(view);
  }
  #consumeCurrentContextAppViewInfo(): AppViewInfo | undefined {
    return this.#appViewInfoList.pop();
  }
  #associateCurrentContextAppComponentBody(view: View) {
    const info = this.#consumeCurrentContextAppViewInfo();
    if (info == null) {
      return;
    }

    view.appViewInfo = info;
    this.allAppViewReferences.push(view as AppView);
  }
  countOfAppView(appComponentOriginalName: string): number {
    const appViewCount = this.allAppViewReferences.filter(
      (e) => e.appViewInfo.appComponentOriginalName === appComponentOriginalName
    ).length;
    const appViewInfoCount = this.#appViewInfoList.filter(
      (e) => e.appComponentOriginalName === appComponentOriginalName
    ).length;
    return appViewCount + appViewInfoCount;
  }
}
