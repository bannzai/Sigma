export function isBlendMixin(node: object): node is BlendMixin {
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
