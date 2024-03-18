import React, { useState } from "react";
import styled from "styled-components";

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
});

const Button = styled.div({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "gray",
  fontWeight: "bold",
  alignItems: "center",
  borderRadius: "2rem",
  height: "100%",
  width: "25%",
});

const opacity = {
  food: 0.5,
  effect: 0.5,
};

export default function CategoryBar() {
  const [currentCategory, setcurrentCategory] = useState("food");
  function opacityStyle(category) {
    for (const key in opacity) {
      if (key === category) {
        opacity[key] = 1;
      } else {
        opacity[key] = 0.5;
      }
    }
  }
  opacityStyle(currentCategory);
  function clickHandler(e) {
    setcurrentCategory(e.target.id);
  }
  return (
    <Bar>
      <Button
        onClick={clickHandler}
        id={"food"}
        style={{ opacity: opacity.food }}
      >
        간식
      </Button>
      <Button
        onClick={clickHandler}
        id={"effect"}
        style={{ opacity: opacity.effect }}
      >
        효과
      </Button>
    </Bar>
  );
}
