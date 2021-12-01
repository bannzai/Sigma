export class BuildContext {
  code: string = "";
  indent: number = 0;
  withoutIndent: boolean = false;
  withoutLineBreak: boolean = false;

  nest() {
    this.indent += 4;
  }
  unnest() {
    this.indent -= 4;
  }

  disableIndent() {
    this.withoutIndent = true;
  }
  enableIndent() {
    this.withoutIndent = false;
  }

  disableLineBreak() {
    this.withoutLineBreak = true;
  }
  enableLineBreak() {
    this.withoutLineBreak = false;
  }

  add(
    code: string,
    options?: {
      withoutIndent?: boolean;
      withoutLineBreak?: boolean;
    }
  ) {
    let withoutIndent = options?.withoutIndent ?? this.withoutIndent;
    let withoutLineBreak = options?.withoutLineBreak ?? this.withoutLineBreak;
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