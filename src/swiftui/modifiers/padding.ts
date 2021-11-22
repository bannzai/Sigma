import { SwiftUIContext } from "../context";

export function walkForPadding(context: SwiftUIContext, node: BaseFrameMixin) {
  const {
    paddingLeft: left,
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
  } = node;

  if ([left, top, right, bottom].every((e) => e === 0)) {
    return;
  }

  if (left === top && top === right && right === bottom) {
    context.add("\n");
    context.add(`.padding(.all, ${top})`);
  } else {
    const paddingTypes = [
      "left",
      "top",
      "right",
      "bottom",
      "horizontal",
      "vertical",
    ] as const;
    type PaddingType = typeof paddingTypes[number];
    const paddings = new Map<PaddingType, number>();

    if (left !== 0 || right !== 0) {
      if (left === right) {
        paddings.set("horizontal", left);
      } else {
        if (left !== 0) {
          paddings.set("left", left);
        }
        if (right !== 0) {
          paddings.set("right", right);
        }
      }
    }

    if (top !== 0 || bottom !== 0) {
      if (top === bottom) {
        paddings.set("vertical", top);
      } else {
        if (top !== 0) {
          paddings.set("top", top);
        }
        if (right !== 0) {
          paddings.set("bottom", bottom);
        }
      }
    }

    const paddingValues = Array.from(paddings.values());
    const isAllEqual = paddingValues.every((e) => e === paddingValues[0]);
    if (isAllEqual && paddingValues.length !== 1) {
      const directions = Array.from(paddings.keys())
        .map((e) => `.${e}`)
        .join(", ");
      context.lineBreak();
      context.add(`.padding([${directions}], ${paddingValues[0]})\n`);
    } else {
      const keys = Array.from(paddings.keys());
      const compare: (l: PaddingType, r: PaddingType) => number = (l, r) => {
        return paddingTypes.indexOf(l) - paddingTypes.indexOf(r);
      };
      keys.sort(compare).forEach((key) => {
        const value = paddings.get(key)!;
        context.lineBreak();
        context.add(`.padding(.${key}, ${value})\n`);
      });
    }
  }
}
