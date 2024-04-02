import React, { useState } from "react";
import { usePetStore } from "../../store/petStore";
import { useStore } from "../../store/store";
import Tooltip from "@mui/material/Tooltip";

export default function Emotion() {
  const { emotion } = usePetStore();
  const { emotions } = useStore();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const emotionKoreanMap = {
    JOY: "기쁨",
    ANGER: "분노",
    SAD: "슬픔",
    FEAR: "두려움",
    CURIOSITY: "호기심",
  };

  const handleTooltipOpen = () => {
    setIsTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
  };

  return (
    <>
      <Tooltip
        title={`펫 감정: ${emotionKoreanMap[emotion]}`}
        arrow
        open={isTooltipOpen}
        onClose={handleTooltipClose}
        placement="top-end" // 툴팁을 이미지 위에 표시
      >
        <img
          src={`${EMOJI_URL}/${emotions[emotion]}`}
          style={{
            width: "3rem",
            height: "3rem",
            cursor: "pointer",
          }}
          onClick={handleTooltipOpen}
        />
      </Tooltip>
    </>
  );
}
