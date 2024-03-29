import React, { useState } from "react";
import styled from "@emotion/styled";
import { usePetStore } from "../../store/petStore";

const Bar = styled.div`
  background-color: #686868;
  border-radius: 1rem;
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ExpBarFill = styled.div`
  height: 85%;
  width: ${({ exp }) => `${exp}%`};
  background-color: #b8eea4;
  border-radius: 1rem;
  transition: width 0.5s ease-in-out; /* 경험치가 변경될 때 애니메이션 효과 추가 */
`;

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
        <ExpBarFill exp={exp * 10} />
      </Bar>
    </div>
  );
}
