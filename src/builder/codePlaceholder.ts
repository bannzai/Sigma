export function codePlaceholder(key: string, type?: string): string {
  if (type == null) {
    return `<#T##${key}#>`;
  } else {
    return `<#T##${key}: ${type}##${type}#>`;
  }
}
