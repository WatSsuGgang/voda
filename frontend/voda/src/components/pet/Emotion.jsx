import React from "react";
import { usePetStore } from "../../store/petStore";

export default function Emotion() {
  const { emotion } = usePetStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const emotion_map = {
    JOY: "Grinning%20Face%20with%20Smiling%20Eyes",
    ANGER: "Enraged%20Face",
    SAD: "Loudly%20Crying%20Face",
    FEAR: "Fearful%20Face",
    CURIOSITY: "Nerd%20Face",
  };
  return (
    <>
      <img
        src={`${EMOJI_URL}/Smilies/${emotion_map[emotion]}.png`}
        style={{
          width: "3rem",
          height: "3rem",
        }}
      />
    </>
  );
}
