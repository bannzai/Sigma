// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBlendMixin(node: any): node is BlendMixin {
  const blendMixinTypes = [
    "ELLIPSE",
    "POLYGON",
    "STAR",
    "VECTOR",
    "TEXT",
    "FRAME",
    "COMPONENT",
    "INSTANCE",
    "COMPONENT_SET",
    "GROUP",
  ];

  if (blendMixinTypes.includes(node.type)) {
    return true;
  } else {
    return false;
  }
}
