import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function Pet() {
  const pet = {
    nickname: "브러시버디",
    url: [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Egg.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dodo.png",
    ],
  };
  const effect = {
    url: [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Rain.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Done.png",
    ],
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img
          src={effect.url[1]}
          style={{
            width: "5rem",
            height: "5rem",
          }}
        />
        <img
          src={pet.url[2]}
          style={{
            width: "12rem",
            height: "12rem",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{pet.nickname}</h2>
        <IconButton>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
