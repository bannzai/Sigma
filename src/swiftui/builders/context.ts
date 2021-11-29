export class BuildContext {
  code: string = "";
  indent: number = 0;

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
    var withoutIndent = options?.withoutIndent ?? false;
    if (code === "\n") {
      withoutIndent = true;
    }

    const indent = withoutIndent ? "" : this._indent();
    this.code += `${indent}${code}`;
  }

  _indent(): string {
    return Array(this.indent).fill(" ").join("");
  }
}
