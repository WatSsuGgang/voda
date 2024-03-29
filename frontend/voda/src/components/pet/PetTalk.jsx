import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePetStore } from "../../store/petStore";
import { getPetTalk } from "../../services/pet";

const Chatbox = styled.div({
  borderRadius: "2rem",
  backgroundColor: "#686868",
  width: "70vw",
  color: "white",
  textAlign: "center",
  padding: "1rem",
  height: "1.2rem",
});

export default function PetTalk(props) {
  const [talk, setTalk] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPetTalk();
      const petTalk = data.petTalk;
      console.log(petTalk);
      // 한 글자씩 표시되도록 설정
      for (let i = 0; i < petTalk.length; i++) {
        setTimeout(() => {
          setDisplayedText((prevText) => prevText + petTalk[i]);
        }, i * 100); // 한 글자씩 0.1초 간격으로 나타남
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Chatbox>{displayedText}</Chatbox>
    </>
  );
}
