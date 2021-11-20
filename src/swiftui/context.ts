export type LineBreakType = "Left" | "Right" | "None" | "Both";

export class SwiftUIContext {
  indent: number = 0;
  code: string = "";

  nest() {
    this.indent += 4;
  }
  unnest() {
    this.indent -= 4;
  }

  add(code: string, lineBreakType: LineBreakType = "None") {
    if (lineBreakType === "None") {
      this.code += `${this._indent()}${code}`;
    } else {
      if (lineBreakType === "Left") {
        this.code += `\n${this._indent()}${code}`;
      } else if (lineBreakType === "Right") {
        this.code += `${this._indent()}${code}\n`;
      } else if (lineBreakType === "Both") {
        this.code += `\n${this._indent()}${code}\n`;
      }
    }
  }

  _indent(): string {
    return Array(this.indent).fill(" ").join("");
  }
}
