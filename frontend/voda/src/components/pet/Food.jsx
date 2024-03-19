import React from "react";
import usePetStore from "../../store/petStore";

export default function Food() {
  const { currentFood, isFed, setIsFed, isFeeding, setIsFeeding } =
    usePetStore();
  function clickHandler(e) {
    if (!isFed) {
      const food = document.getElementById("food");
      const foodFeeding = document.getElementById("foodFeeding");
      // food.animate(newspaperSpinning, newspaperTiming);
      food.animate(
        [
          {
            // from
            opacity: 1,
            filter: "grayscale(0%)",
            transform: "translateX(0%) translateY(0%) rotate(0deg) scale(1)",
          },
          {
            // to
            filter: "grayscale(50%)",
            opacity: 0,
            transform: `translateX(-250%) translateY(+400%) rotate(${Math.round(
              Math.random() * 3600
            )}deg) scale(0.5)`,
          },
        ],
        1000
      );
      setIsFed(!isFed);
    }
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
