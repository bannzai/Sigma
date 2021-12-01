import { BuildContext } from "./context";
import { FrameModifier } from "../types/modifiers";

export function walkToFrame(context: BuildContext, frame: FrameModifier) {
  const maximumFrameArguments: string[] = [];
  if (frame.maxWidth != null || frame.maxHeight != null) {
    if (frame.maxWidth != null) {
      maximumFrameArguments.push(`maxWidth: .infinity`);
    }
    if (frame.maxHeight != null) {
      maximumFrameArguments.push(`maxHeight: .infinity`);
    }
  }
  const fixedFrameArguments: string[] = [];
  if (frame.width != null || frame.height != null) {
    if (frame.width != null) {
      fixedFrameArguments.push(`width: ${frame.width}`);
    }
    if (frame.height != null) {
      fixedFrameArguments.push(`height: ${frame.height}`);
    }
  }
  if (frame.alignment != "center") {
    if (maximumFrameArguments.length > 0) {
      maximumFrameArguments.push(`alignment: .${frame.alignment})`);
    } else if (fixedFrameArguments.length > 0) {
      fixedFrameArguments.push(`alignment: .${frame.alignment})`);
    }
  }

  if (maximumFrameArguments.length > 0) {
    const maximumFrameArgument = maximumFrameArguments.join(", ");
    context.add(`.frame(${maximumFrameArgument})`);
  }
  if (fixedFrameArguments.length > 0) {
    const fixedFrameArgument = fixedFrameArguments.join(", ");
    context.add(`.frame(${fixedFrameArgument})`);
  }
}
