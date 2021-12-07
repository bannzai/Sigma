import * as React from "react";

export const VSpace: React.VFC<{ height: number }> = ({ height }) => {
  return (
    <span
      style={{
        display: "block",
        width: 1,
        minWidth: 1,
        height,
        minHeight: height,
      }}
    />
  );
};
