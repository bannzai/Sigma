import { v4 as uuidv4 } from "uuid";

export function viewID(): string {
  return uuidv4();
}
