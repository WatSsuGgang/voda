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
    transform: scale(1.25); /* 중간에 크기가 커집니다. */
    filter: brightness(1.5); /* 중간에 더 밝게 광채를 낸다 */
  }
`;

// 진화 애니메이션을 적용할 스타일드 컴포넌트
const EvolvingAnimation = styled.img`
  animation: ${glow} 2s ease-in-out infinite; /* 애니메이션 적용 */
`;

const reverseGlow = keyframes`
  0%, 100% {
    transform: scale(1.25); /* 처음과 마지막에 크기가 커집니다. */
    filter: brightness(1.5); /* 처음과 마지막에 더 밝게 광채를 낸다 */
  }
  50% {
    transform: scale(1); /* 중간에 크기가 작아집니다. */
    filter: brightness(1); /* 중간에 광채가 어둡게 됩니다. */
  }
  `;

// 진화 애니메이션을 적용할 스타일드 컴포넌트
const EvolvedAnimation = styled.img`
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

const stretchHorizontal = keyframes`
  0%, 100% { transform: scaleX(1); }
  20%, 80% { transform: scaleX(1.1) scaleY(0.95); }
  40%, 60% { transform: scaleX(0.95) scaleY(1.1); }
`;

// 펫 만지면
const PetTouchedAnimation = styled.img`
  animation: ${stretch} 0.5s ease-in-out; /* 애니메이션 적용 */
`;

// 이펙트 만지면
const EffectTouchedAnimation = styled.img`
  animation: ${stretchHorizontal} 0.5s ease-in-out; /* 애니메이션 적용 */
`;

export default function Pet() {
  const {
    setPetTouched,
    petMap,
    using,
    name,
    setName,
    exp,
    stage,
    petAppearance,
    setPetStatus,
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
  const [isEvolved, setIsEvolved] = useState(false);
  const [isPetTouched, setIsPetTouched] = useState(false); // pulse 애니메이션 상태 추가
  const [isEffectTouched, setIsEffectTouched] = useState(false); // pulse 애니메이션 상태 추가
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;

  async function evolvePet(updatedStage, updatedPetAppearance) {
    setIsEvolving(true); // 진화 애니메이션 시작
    setPetStatus("evolving");
    // 여기서 setTimeout을 사용하여 진화 애니메이션을 2초간 실행합니다.
    // 애니메이션이 완료되는 시점에 setIsEvolving(false)를 호출합니다.
    setTimeout(() => {
      // 진화 애니메이션이 끝난 후에 진화된 petAppearance로 업데이트
      setStage(updatedStage);
      setPetAppearance(updatedPetAppearance);
      setIsEvolving(false); // 진화 애니메이션 종료
      setIsEvolved(true);
      setPetStatus("evolved");
    }, 3000); // 진화 애니메이션의 지속 시간에 맞추어 설정
  }

  async function levelupPet() {
    const response = await levelUpPet(); // 레벨업 함수 호출
    const updatedPet = response.data;
    // 펫 스테이트 업데이트
    setName(updatedPet.name);
    setLevel(updatedPet.level);
    setEmotion(updatedPet.emotion);
    setIsFeed(updatedPet.isFeed);
    setPetId(updatedPet.petId);
    setIsEvolution(updatedPet.isEvolution);

    if (updatedPet.stage > stage) {
      // 진화 애니메이션 발동
      evolvePet(updatedPet.stage, updatedPet.petAppearance); // 진화 애니메이션 실행
      setTimeout(() => {
        // 진화 애니메이션이 끝난 후에 진화된 petAppearance로 업데이트
        setIsEvolving(false); // 진화 애니메이션 종료
        setIsEvolved(true);
        setPetStatus("evolved");
      }, 3000); // 진화 애니메이션의 시간에 맞추어 설정
      setTimeout(() => {
        setIsEvolved(false);
        setIsEvolution(false);
        setPetStatus("normal");
        setExp(updatedPet.exp);
        setStage(updatedPet.stage);
        setPetAppearance(updatedPet.petAppearance);
      }, 6000);
    } else {
      setTimeout(() => {
        setExp(updatedPet.exp);
        setStage(updatedPet.stage);
        setPetAppearance(updatedPet.petAppearance);
      }, 500);
    }
  }

  useEffect(() => {
    if (exp >= 10) {
      levelupPet();
    }
  }, [exp]);

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
      setName(response.data.name);
      setNewName("");
      handleCloseModal();
    } else {
      setIsNewNameEmpty(true);
    }
  }

  // Pet pulse 애니메이션을 트리거하는 함수
  function handlePetTouchedAnimation() {
    setIsPetTouched(true);
    setPetTouched(true);
    setTimeout(() => {
      setIsPetTouched(false);
      setPetTouched(false);
    }, 1500); // 2초 후에 pulse 애니메이션 종료
  }
  // Effect pulse 애니메이션을 트리거하는 함수
  function handleEffectTouchedAnimation() {
    setIsEffectTouched(true);
    setTimeout(() => {
      setIsEffectTouched(false);
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
        {/* Effect */}
        {isEffectTouched ? (
          <EffectTouchedAnimation
            src={`${EMOJI_URL}/${using.effect.item.imgURl}`}
            style={{
              width: "5rem",
              height: "5rem",
            }}
          />
        ) : (
          <img
            src={`${EMOJI_URL}/${using.effect.item.imgURl}`}
            style={{
              width: "5rem",
              height: "5rem",
            }}
            onClick={handleEffectTouchedAnimation} // 클릭 시 pulse 애니메이션 트리거
          />
        )}

        {/* Pet */}
        {/* Pet Evolving? */}
        {isEvolving ? (
          <EvolvingAnimation
            src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
            style={{
              width: "12rem",
              height: "12rem",
            }}
          />
        ) : // Pet Evolved?
        isEvolved ? (
          <EvolvedAnimation
            src={`${EMOJI_URL}/${petMap[stage][petAppearance]}`}
            style={{
              width: "12rem",
              height: "12rem",
            }}
          ></EvolvedAnimation>
        ) : // Pet Touched?
        isPetTouched ? (
          <PetTouchedAnimation
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
            onClick={handlePetTouchedAnimation} // 클릭 시 pulse 애니메이션 트리거
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
