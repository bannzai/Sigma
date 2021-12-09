import { View, ChildrenMixin } from "./views";

export interface AppView extends View, ChildrenMixin {
  readonly type: "App";

  name: string;
  node: FrameNode;
}
