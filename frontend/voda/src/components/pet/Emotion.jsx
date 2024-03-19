import React from "react";

export default function Emotion() {
  const emotion = {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Squinting%20Face.png",
  };
  return (
    <>
      <img
        src={emotion.url}
        style={{
          width: "3rem",
          height: "3rem",
        }}
      />
    </>
  );
}
