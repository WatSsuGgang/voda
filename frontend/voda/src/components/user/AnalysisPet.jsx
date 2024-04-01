import React from "react";
import styled from "styled-components";
import { usePetStore } from "../../store/petStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25% auto;
`;

const AnalysisPet = () => {
  const { petMap, name, stage, petAppearance } = usePetStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const navigate = useNavigate();
  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "5vh",
        }}
      >
        {name} 얼마나 컸는지 <br />
        보러 가볼까요?
      </div>
      <img
        src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
        style={{
          width: "15rem",
          height: "15rem",
          marginBottom: "5vh",
        }}
      />
      <Button
        variant="contained"
        style={{
          width: "65vw",
          height: "5vh",
          marginBottom: "5vh",
          backgroundColor: "#B4D89E",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        onClick={() => {
          navigate("/pet");
        }}
      >
        보러 가기
      </Button>
    </Container>
  );
};

export default AnalysisPet;
