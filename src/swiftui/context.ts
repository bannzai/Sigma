export interface SwiftUIFrameNode {
  node: FrameNode;
  isOnlyOneChild: boolean;
}

export class SwiftUIContext {
  indent: number = 0;
  code: string = "";
  frameNodeHistories: SwiftUIFrameNode[] = [];
  ignoredIndent: boolean = false;
  root!: SceneNode;

  nest() {
    this.indent += 4;
  }
  unnest() {
    this.indent -= 4;
  }

  push(node: FrameNode) {
    this.frameNodeHistories.push({
      node,
      isOnlyOneChild: node.children.length === 1,
    });
  }
  pop(): SwiftUIFrameNode | null {
    return this.frameNodeHistories.pop() ?? null;
  }
  get latestFrameNode(): SwiftUIFrameNode | null {
    if (this.frameNodeHistories.length === 0) {
      return null;
    }
    return this.frameNodeHistories[this.frameNodeHistories.length - 1];
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
