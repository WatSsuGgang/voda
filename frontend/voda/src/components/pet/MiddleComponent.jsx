import React from "react";
import Emotion from "./Emotion";
import ExpBar from "./ExpBar";
import Food from "./Food";

export default function MiddleComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Emotion />
      <ExpBar />
      <Food />
    </div>
  );
}
