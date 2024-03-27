import React from "react";
import { usePetStore } from "../../store/petStore";
import { feedPet } from "../../services/pet";

export default function Food() {
  const {
    isFeed,
    setIsFeed,
    using,
    setPetId,
    setIsEvolution,
    setName,
    setPetAppearance,
    setStage,
    setLevel,
    setExp,
    setEmotion,
  } = usePetStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  function feedAnimation() {
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
      feedAnimation();
      try {
        const data = await feedPet();
        setPetId(data.petId);
        setIsEvolution(data.isEvolution);
        setName(data.name);
        setPetAppearance(data.petAppearance);
        setStage(data.stage);
        setLevel(data.level);
        setExp(data.exp);
        setEmotion(data.emotion);
        setIsFeed(data.isFeed);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <img
        id="food"
        src={`${EMOJI_URL}/${using.food.item.imgURl}`}
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
