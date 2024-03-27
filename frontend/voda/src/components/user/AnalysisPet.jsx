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
  const { name, stage, petAppearance } = usePetStore();
  const base_url =
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/";
  const pet_map = {
    1: { 달걀: "Food/Egg.png" },
    2: { 병아리: "Animals/Hatching%20Chick.png" },
    3: {
      앵무새: "Animals/Parrot.png",
      펭귄: "Animals/Penguin.png",
      독수리: "Animals/Eagle.png",
      상어: "Animals/Shark.png",
      도도새: "Animals/Dodo.png",
      비둘기: "Animals/Dove.png",
      고래: "Animals/Spouting%20Whale.png",
      고릴라: "Animals/Gorilla.png",
      나무늘보: "Animals/Sloth.png",
      용: "Animals/Dragon.png",
      티라노: "Animals/T-Rex.png",
      다람쥐: "Animals/Chipmunk.png",
      부엉이: "Animals/Owl.png",
      "검은 고양이": "Animals/Black%20Cat.png",
      까마귀: "Animals/Black%20Bird.png",
    },
  };
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
        src={base_url + pet_map[stage][petAppearance]}
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
