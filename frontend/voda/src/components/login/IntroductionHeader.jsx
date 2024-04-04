import React from "react";
import vodaLogo from "/logo.svg";

export default function IntroductionHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "1.5rem",
      }}
    >
      <img
        src={vodaLogo}
        style={{
          width: "3rem",
          height: "3rem",
        }}
      />
    </div>
  );
}
