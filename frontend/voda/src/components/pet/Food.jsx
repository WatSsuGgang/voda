import React, { useState, useEffect } from "react";
import { usePetStore } from "../../store/petStore";
import { feedPet } from "../../services/pet";
import Tooltip from "@mui/material/Tooltip";

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
  const [nextFeedTime, setNextFeedTime] = useState("00:00:00");
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // 두 자리로 만들어주는 함수
  function zfill(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function calculateNextFeedTime() {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay.getTime() - now.getTime();
  }

  function displayNextFeedTime() {
    const timeLeft = calculateNextFeedTime();
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    // zfill 함수를 사용하여 시간, 분, 초를 두 자리로 만들어줌
    return `${zfill(hours)}:${zfill(minutes)}:${zfill(seconds)}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNextFeedTime(displayNextFeedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function feedAnimation() {
    const food = document.getElementById("food");
    food.animate(
      [
        {
          opacity: 1,
          filter: "grayscale(0%)",
          transform: "translateX(0%) translateY(0%) rotate(0deg) scale(1)",
        },
        {
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
        setNextFeedTime(displayNextFeedTime());
      } catch (error) {
        console.error();
      }
    } else {
      setTooltipOpen(true);
    }
  }
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };
  return (
    <>
      <Tooltip
        title={`다음 간식까지 ${nextFeedTime}`}
        placement="bottom-start"
        onClose={handleTooltipClose}
        open={tooltipOpen}
      >
        <img
          id="food"
          src={`${EMOJI_URL}/${using.food.item.imgURl}`}
          onClick={clickHandler}
          style={{
            filter: isFeed ? "grayscale(100%)" : "grayscale(0%)",
            opacity: isFeed ? "0.5" : "1",
            width: "3rem",
            height: "3rem",
          }}
        />
      </Tooltip>
    </>
  );
}
