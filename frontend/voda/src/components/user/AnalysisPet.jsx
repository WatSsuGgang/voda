import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePetStore, usePetPersistStore } from "../../store/petStore";
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
  const { usingId } = usePetPersistStore();

  const navigate = useNavigate();

  function checkName(name = "") {
    //name의 마지막 음절의 유니코드(UTF-16)
    const charCode = name.charCodeAt(name.length - 1);

    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;

    if (consonantCode === 0) {
      //0이면 받침 없음 -> 를
      return "는";
    }
    //1이상이면 받침 있음 -> 을
    return "이는";
  }

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
        {usingId.name}
        {checkName(usingId.name)} 얼마나 컸는지 <br />
        보러 가볼까요?
      </div>
      <img
        src={`${EMOJI_URL}/${usingId.petImageUrl}`}
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
