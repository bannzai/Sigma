import { Color } from "../types/views";

export function mappedSwiftUIColor(color: Color): string {
  const { red, blue, green, opacity } = color;
  if (opacity != null && opacity !== 1) {
    return `Color(red: ${truncated(red)}, green: ${truncated(
      green
    )}, blue: ${truncated(blue)}, opacity: ${truncated(opacity)})`;
  } else {
    return `Color(red: ${truncated(red)}, green: ${truncated(
      green
    )}, blue: ${truncated(blue)})`;
  }
}

const truncated = (value: number): string => {
  return value.toFixed(2).replace(/\.00$/, "");
};
