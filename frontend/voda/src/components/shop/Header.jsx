import React from "react";
import styled from "styled-components";

const HeaderComponent = styled.div({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "85%",
  borderBottom: "1px solid #ccc",
});

export default function Header() {
  return (
    <HeaderComponent>
      <h3>상점</h3>
    </HeaderComponent>
  );
}
