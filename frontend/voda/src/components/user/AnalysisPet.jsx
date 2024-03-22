import React from "react";
import styled from "styled-components";
import usePetStore from "../../store/petStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25% auto;
`;

const AnalysisPet = ({ report }) => {
  const pet = usePetStore();

  const navigate = useNavigate();
  return (
    <Container>
      <div
        style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}
      >
        00이는 얼마나 컸는지 <br />
        보러 가볼까요?
      </div>
      <div>img</div>
      <Button
        variant="contained"
        color="primary"
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
