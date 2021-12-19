import { BuildContext } from "./context";

export function trace(
  prefix: string = "",
  _context: BuildContext,
  view: { type: string }
) {
  const { type } = view;
  console.log(`${prefix} ${JSON.stringify({ type })}`);
}
