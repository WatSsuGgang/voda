import React from "react";
import usePetStore from "../../store/petStore";
import { feedPet } from "../../services/pet";

export default function Food() {
  const { currentFood, isFeed, petId } = usePetStore();
  function feed() {
    const food = document.getElementById("food");
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
  }

  async function clickHandler(e) {
    if (!isFeed) {
      feed();
      try {
        const response = await feedPet(petId);
      } catch (error) {
        alert("먹이가 없음");
      }
    }
  }
  return (
    <>
      <img
        id="food"
        src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/${currentFood}.png`}
        onClick={clickHandler}
        style={
          isFeed
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
