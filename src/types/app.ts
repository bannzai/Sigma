import { View, ChildrenMixin } from "./views";

export function isAppView(args: { type: string }): args is AppView {
  return (["App"] as Readonly<string[]>).includes(args.type);
}
export interface AppView extends View, ChildrenMixin {
  readonly type: "App";

  name: string;
  node: FrameNode;
}
