import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { usePetStore } from "../../store/petStore";
import { Modal } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { editPetName, levelUpPet } from "../../services/pet";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 10rem;
  border-radius: 2rem;
  background-color: white;
  padding: 1rem;
`;

// 진화 애니메이션 Keyframes 정의
const glow = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.5); /* 중간에 크기가 커집니다. */
    filter: brightness(2); /* 중간에 더 밝게 광채를 낸다 */
  }
`;

// 진화 애니메이션을 적용할 스타일드 컴포넌트
const EvolutionAnimation = styled.img`
  animation: ${glow} 2s ease-in-out infinite; /* 애니메이션 적용 */
`;

// 진화 상태가 아닐 때의 애니메이션 Keyframes 정의
const pulse = keyframes`
  0%, 100% {
    transform: scale(1); /* 초기 크기 */
  }
  50% {
    transform: scale(1.1); /* 중간에 약간 크기가 커짐 */
  }
`;

// 평소에 적용할 스타일드 컴포넌트
const NormalAnimation = styled.img`
  animation: ${pulse} 1s alternate infinite; /* 애니메이션 적용 */
`;

// 쫀득한 애니메이션 Keyframes 정의
// 수직방향으로 줄었다가 늘어나기 애니메이션 keyframes
const stretch = keyframes`
  0%, 100% { transform: scaleY(1); }
  20%, 80% { transform: scaleY(1.1) scaleX(0.95); }
  40%, 60% { transform: scaleY(0.95) scaleX(1.1); }
`;

// 쫀득한 애니메이션을 적용할 스타일드 컴포넌트
const TouchedAnimation = styled.img`
  animation: ${stretch} 0.5s ease-in-out; /* 애니메이션 적용 */
`;

export default function Pet() {
  const {
    petMap,
    using,
    name,
    setName,
    stage,
    petAppearance,
    isEvolution,
    setUsing,
    setEmotion,
    setExp,
    setIsEvolution,
    setIsFeed,
    setLevel,
    setPetAppearance,
    setPetId,
    setStage,
  } = usePetStore();
  const [newName, setNewName] = useState("");
  const [isNewNameEmpty, setIsNewNameEmpty] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // pulse 애니메이션 상태 추가
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;

  async function evolvePet() {
    setIsEvolving(true); // 진화 애니메이션 트리거
    const response = await levelUpPet(); // 진화 함수 호출
    // 응답에서 업데이트된 펫 정보 추출
    console.log("레벨업", response);
    const updatedPet = response.data;

    // 5초 후에 실행될 로직
    setTimeout(() => {
      // 펫 스테이트 업데이트
      setName(updatedPet.name);
      setStage(updatedPet.stage);
      setLevel(updatedPet.level);
      setEmotion(updatedPet.emotion);
      setExp(updatedPet.exp);
      setIsFeed(updatedPet.isFeed);
      setPetId(updatedPet.petId);
      setPetAppearance(updatedPet.petAppearance);
      setIsEvolution(updatedPet.isEvolution);

      setIsEvolving(false); // 진화 애니메이션 종료
    }, 5000); // 5000ms = 5초
  }

  useEffect(() => {
    if (isEvolution) {
      setIsEvolving(isEvolution);
      evolvePet();
    }
  }, [isEvolution]);

  function newNameChangeHandler(e) {
    setNewName(e.target.value);
    setIsNewNameEmpty(false);
  }

  async function newNameSubmitHandler(e) {
    e.preventDefault();
    if (
      newName.match(/^(?![0-9])[a-zA-Z\uAC00-\uD7A3][a-zA-Z\uAC00-\uD7A3\d]*$/)
    ) {
      const response = await editPetName(newName);
      console.log("반응", response);
      setName(response.data.name);
      setNewName("");
      handleCloseModal();
    } else {
      setIsNewNameEmpty(true);
    }
  }

  // pulse 애니메이션을 트리거하는 함수
  function handleTouchedAnimation() {
    setIsTouched(true);
    setTimeout(() => {
      setIsTouched(false);
    }, 1000); // 2초 후에 pulse 애니메이션 종료
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {using.effect.item && (
          <img
            src={`${EMOJI_URL}/${using.effect.item.imgURl}`}
            style={{
              width: "5rem",
              height: "5rem",
            }}
          />
        )}
        {isEvolving ? (
          <EvolutionAnimation
            src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
            style={{
              width: "12rem",
              height: "12rem",
            }}
          />
        ) : isTouched ? (
          <TouchedAnimation
            src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
            style={{
              width: "12rem",
              height: "12rem",
            }}
          />
        ) : (
          <NormalAnimation
            src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
            style={{
              width: "12rem",
              height: "12rem",
            }}
            onClick={handleTouchedAnimation} // 클릭 시 pulse 애니메이션 트리거
          />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{name}</h2>
        <IconButton onClick={handleOpenModal}>
          <EditIcon />
        </IconButton>
        <Modal open={openModal} onClose={handleCloseModal}>
          <ModalForm>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="펫 이름"
                variant="outlined"
                onChange={newNameChangeHandler}
              />
              {isNewNameEmpty && (
                <>
                  <p
                    style={{
                      margin: "0 auto",
                      color: "red",
                      fontSize: "0.75rem",
                    }}
                  >
                    한글 또는 영문의 한 단어어야 합니다.
                  </p>
                </>
              )}
              <Button variant="contained" onClick={newNameSubmitHandler}>
                저장
              </Button>
            </div>
          </ModalForm>
        </Modal>
      </div>
    </div>
  );
}
