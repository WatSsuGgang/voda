import React from "react";

export default function Food() {
  const food = {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Candy.png",
  };
  return (
    <>
      <img
        src={food.url}
        style={{
          width: "3rem",
          height: "3rem",
        }}
      />
    </>
  );
}
