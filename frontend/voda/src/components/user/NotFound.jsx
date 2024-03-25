import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20% auto",
      }}
    >
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Cross%20Mark.png"
        alt="Cross Mark"
        width="300"
        height="300"
      />
      <h3 style={{ marginBottom: "30%" }}>아직 작성한 일기가 없습니다</h3>

      <Button
        onClick={() => {
          navigate("/voice");
        }}
        style={{
          width: "60vw",
          height: "5vh",
          marginBottom: "5vh",
          backgroundColor: "#FFC876",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "10px",
        }}
      >
        일기 쓰러 가기
      </Button>
    </div>
  );
};

export default NotFound;
