export class SwiftUIContext {
  indent: number = 0;
  code: string = "";
  ignoredIndent: boolean = false;

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

  lineBreak(isForceLineBreak: boolean = false) {
    if (isForceLineBreak) {
      this.add("\n");
    } else if (this.code.length > 0 && !this.code.endsWith("\n")) {
      this.add("\n");
    }
  }

  _indent(): string {
    if (this.ignoredIndent) {
      return "";
    }
    return Array(this.indent).fill(" ").join("");
  }
}
