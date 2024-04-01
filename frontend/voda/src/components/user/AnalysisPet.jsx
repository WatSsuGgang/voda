import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePetStore } from "../../store/petStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getPet } from "../../services/pet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25% auto;
`;

const AnalysisPet = () => {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const { petMap } = usePetStore();
  const [stage, setStage] = useState();
  const [petAppearance, setPetAppearance] = useState();
  const [name, setName] = useState();
  const [petImageUrl, setPetImageUrl] = useState();
  const fetchData = async () => {
    try {
      const data = await getPet();
      setStage(data.pet.stage);
      setPetAppearance(data.pet.petAppearance);
      setName(data.pet.name);
      setPetImageUrl(`${petMap[data.pet.stage][data.pet.petAppearance]}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        src={`${EMOJI_URL}/${petImageUrl}`}
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
