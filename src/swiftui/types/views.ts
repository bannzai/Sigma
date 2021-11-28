import { Modifier } from "./modifiers";

export interface View {
  readonly id: string;
  modifiers: Modifier[];
}
