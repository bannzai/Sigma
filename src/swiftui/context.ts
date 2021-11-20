export type LineBreakType = "Left" | "Right" | "Both";

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
      lineBreakType?: LineBreakType;
      withoutIndent?: boolean;
    }
  ) {
    const { lineBreakType, withoutIndent } = options ?? {
      lineBreakType: undefined,
      withoutIndent: undefined,
    };

    const indent = withoutIndent ? "" : this._indent();
    if (lineBreakType == null) {
      this.code += `${indent}${code}`;
    } else {
      if (lineBreakType === "Left") {
        this.code += `\n${indent}${code}`;
      } else if (lineBreakType === "Right") {
        this.code += `${indent}${code}\n`;
      } else if (lineBreakType === "Both") {
        this.code += `\n${indent}${code}\n`;
      }
    }
  }

  _indent(): string {
    return Array(this.indent).fill(" ").join("");
  }
}
