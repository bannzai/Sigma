export class SwiftUIContext {
  indent: number = 0;
  code: string = "";

  nest() {
    this.indent += 4;
  }
  unnest() {
    this.indent -= 4;
  }

  add(code: string) {
    this.code += `${this._indent()} ${code}`;
  }

  _indent(): string {
    return Array(this.indent).fill("\t").join();
  }
}
