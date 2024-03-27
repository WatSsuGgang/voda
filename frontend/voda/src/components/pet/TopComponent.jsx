import React from "react";
import useUserStore from "../../store/userStore";

export default function TopComponent() {
  const { nickname, diaryStreak } = useUserStore();
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
      <h4 style={{ margin: 0 }}>{nickname}님</h4>
      <h3 style={{ margin: 0 }}>일기 쓴지 {diaryStreak}일째</h3>
    </div>
  );
}
