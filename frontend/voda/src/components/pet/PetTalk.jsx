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
  const { petTouched, setPetTouched, petStatus, petAppearance } = usePetStore();

  function checkWord(name = "") {
    //name의 마지막 음절의 유니코드(UTF-16)
    const charCode = name.charCodeAt(name.length - 1);

    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;

    if (consonantCode === 0) {
      //0이면 받침 없음 -> 를
      return "가";
    }
    //1이상이면 받침 있음 -> 을
    return "이";
  }

  const fetchData = async () => {
    const data = await getPetTalk();
    const petTalk = data.petTalk;
    // 새로운 데이터를 표시하기 전에 displayedText 초기화
    setDisplayedText("");
    // 한 글자씩 표시되도록 설정
    for (let i = 0; i < petTalk.length; i++) {
      setTimeout(() => {
        setDisplayedText((prevText) => prevText + petTalk[i]);
      }, i * 100); // 한 글자씩 0.1초 간격으로 나타남
    }
  };

  useEffect(() => {
    setPetTouched(true);
    setTimeout(() => {
      setPetTouched(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (petTouched) {
      fetchData();
    }
  }, [petTouched]);

  useEffect(() => {
    if (petStatus === "evolving") {
      setDisplayedText(`엇..? ${petAppearance}의 상태가..?`);
    } else if (petStatus === "evolved") {
      setDisplayedText(`${petAppearance}${checkWord(petAppearance)} 나왔다!`);
    }
  }, [petStatus]);

  return (
    <>
      <Chatbox>{displayedText}</Chatbox>
    </>
  );
}
