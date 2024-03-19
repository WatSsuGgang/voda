import React from "react";

export default function TopComponent() {
  return (
    <div
      style={{
        display: "flex",
        width: "85%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "end",
        gap: "1rem",
      }}
    >
      <h4 style={{ margin: 0 }}>갓소민님</h4>
      <h3 style={{ margin: 0 }}>오늘 일기 쓰면 1일째</h3>
    </div>
  );
}
