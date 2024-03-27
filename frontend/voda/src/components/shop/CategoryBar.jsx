import React, { useState } from "react";
import styled from "styled-components";
import { usePetStore } from "../../store/petStore";

const Bar = styled.div({
  marginTop: "1rem",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "85%",
  height: "2.5rem",
  borderRadius: "2rem",
  backgroundColor: "lightgray",
  padding: "1rem",
  gap: "0.5rem",
  zIndex: "99",
});

const Button = styled.div({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "gray",
  fontWeight: "bold",
  alignItems: "center",
  borderRadius: "2rem",
  height: "3rem",
  width: "5rem",
});

export default function CategoryBar() {
  const { currentCategory, setCurrentCategory } = usePetStore();
  function clickHandler(e) {
    setCurrentCategory(e.target.id);
  }

  return (
    <Bar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Button
          onClick={clickHandler}
          id={"food"}
          style={currentCategory === "food" ? { opacity: 1 } : { opacity: 0.5 }}
        >
          간식
        </Button>
        <Button
          onClick={clickHandler}
          id={"effect"}
          style={
            currentCategory === "effect" ? { opacity: 1 } : { opacity: 0.5 }
          }
        >
          효과
        </Button>
      </div>
    </Bar>
  );
}
