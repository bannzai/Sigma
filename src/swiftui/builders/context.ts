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
      withoutLineBreak?: boolean;
    }
  ) {
    let withoutIndent = options?.withoutIndent ?? false;
    let withoutLineBreak = options?.withoutLineBreak ?? false;
    if (code === "\n") {
      withoutIndent = true;
      withoutLineBreak = true;
    }

    const indent = withoutIndent ? "" : this._indent();
    const linebreak = withoutLineBreak ? "" : "\n";
    this.code += `${indent}${code}${linebreak}`;
  }

  _indent(): string {
    return Array(this.indent).fill(" ").join("");
  }
}
