export function mappedSwiftUIColor(
  color: RGB,
  opacity: number | undefined
): string {
  if (opacity !== undefined && opacity !== 1) {
    return `Color(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${opacity})`;
  } else {
    return `Color(red: ${color.r}, green: ${color.g}, blue: ${color.b})`;
  }
}
