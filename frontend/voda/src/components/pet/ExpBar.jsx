import React, { useState } from "react";
import styled from "@emotion/styled";
import usePetStore from "../../store/petStore";

const Bar = styled.div({
  backgroundColor: "#686868",
  borderRadius: "1rem",
  height: "1rem",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});
export default function ExpBar() {
  const { level, exp } = usePetStore();
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
      <h3 style={{ margin: "0" }}>Lv.{level}</h3>
      <Bar>
        <div
          id="exp-bar"
          style={{
            height: "100%",
            width: `${exp}`,
            backgroundColor: "#B8EEA4",
            borderRadius: "1rem",
          }}
        ></div>
      </Bar>
    </div>
  );
}
