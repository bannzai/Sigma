import { Color } from "../../types/views";

export function mappedSwiftUIColor(color: Color): string {
  if (color.opacity != null && color.opacity !== 1) {
    return `Color(red: ${color.red}, green: ${color.green}, blue: ${color.blue}, opacity: ${color.opacity})`;
  } else {
    return `Color(red: ${color.red}, green: ${color.green}, blue: ${color.blue})`;
  }
}
