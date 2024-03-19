import React from "react";
import styled from "styled-components";
import usePetStore from "../../store/petStore";
const newspaperSpinning = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const newspaperTiming = {
  duration: 2000,
  iterations: 1,
};
export default function Food() {
  const { currentFood, isFed, setIsFed } = usePetStore();
  function clickHandler(e) {
    const food = document.getElementById("food");
    // food.animate(newspaperSpinning, newspaperTiming);
    food.animate(
      [
        // keyframes
        {
          // transform:
          //   "translateX(-70vw) translateY(+70vh) rotate(720deg) scale(2)",
          transform: "left(50%)",
        },
      ],
      {
        // timing options
        duration: 1500,
      }
    );
    setIsFed(!isFed);
  }
  return (
    <>
      <img
        id="food"
        src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/${currentFood}.png`}
        onClick={clickHandler}
        style={
          isFed
            ? {
                filter: "grayscale(100%)",
                opacity: "0.5",
                width: "3rem",
                height: "3rem",
              }
            : {
                width: "3rem",
                height: "3rem",
              }
        }
      />
    </>
  );
}
