import { View } from "./views";

export interface AppViewInfo {
  appComponentName: string;
  appComponentOriginalName: string;
}

export interface AppView extends View {
  appViewInfo: AppViewInfo;
}

export function isAppView(view: { type: string }): view is AppView {
  return (view as AppView).appViewInfo !== undefined;
}
