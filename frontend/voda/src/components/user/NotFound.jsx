import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
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
        src={`${EMOJI_URL}/People%20with%20activities/Person%20Pouting%20Light%20Skin%20Tone.png`}
        alt="Person Pouting Light Skin Tone"
        width="300"
        height="300"
      />
      <h2 style={{ margin: "10% 0 20% 0" }}>아직 작성한 일기가 없습니다</h2>

      <Button
        onClick={() => {
          navigate("/voice");
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: "60vw",
          height: "8vh",
          marginBottom: "5vh",
          backgroundColor: isHovered ? "#0E5F07" : "#95C591",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderRadius: "10px",
          transition: "background-color 0.3s ease",
          boxShadow: isHovered
            ? "0px 5px 15px  rgba(1, 1, 0, 1)"
            : "1px 1px 1px rgb(255,255,255), 0 5px 5px rgba(0,0,0,.35)",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: isHovered
              ? "#0E5F07 !important"
              : "#95C591 !important",
          },
        }}
      >
        일기 쓰러 가기
      </Button>
    </div>
  );
};

export default NotFound;
