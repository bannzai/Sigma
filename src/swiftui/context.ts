export class SwiftUIContext {
  indent: number = 0;
  code: string = "";

  nest() {
    this.indent += 4;
  }
  unnest() {
    this.indent -= 4;
  }

  add(
    code: string,
    options?: {
      withoutIndent?: boolean;
    }
  ) {
    const withoutIndent = options?.withoutIndent ?? false;

    const indent = withoutIndent ? "" : this._indent();
    this.code += `${indent}${code}`;
  }

  _indent(): string {
    return Array(this.indent).fill(" ").join("");
  }
}
