export class SwiftUIContext {
  indentLevel: number = 0;
  code: string = "";

  nest() {
    this.indentLevel += 4;
  }
  unnest() {
    this.indentLevel -= 4;
  }
}
