import React from "react";
import styled from "@emotion/styled";

const Bar = styled.div({
  backgroundColor: "#686868",
  borderRadius: "1rem",
  height: "1rem",
  width: "100%",
});
export default function ExpBar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h3 style={{ margin: "0" }}>Lv.1</h3>
      <Bar />
    </div>
  );
}
