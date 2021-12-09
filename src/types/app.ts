import { View } from "./views";

export interface AppView extends View {
  readonly type: "App";

  name: string;
}
