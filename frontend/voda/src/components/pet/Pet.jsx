import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import usePetStore from "../../store/petStore";
import { Modal } from "@mui/material";
import styled from "styled-components";
import { editPetName } from "../../services/pet";
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

export default function Pet() {
  const { name, setName, stage, petAppearance } = usePetStore();
  const [newName, setNewName] = useState("");
  const [isNewNameEmpty, setIsNewNameEmpty] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
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

  function newNameChangeHandler(e) {
    setNewName(e.target.value);
    setIsNewNameEmpty(false);
  }

  async function newNameSubmitHandler(e) {
    e.preventDefault();
    if (newName.length > 0) {
      const response = await editPetName(newName);
      setName(response.name);
      setNewName("");
      handleCloseModal();
    } else {
      setIsNewNameEmpty(true);
    }
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
        {/* <img
          src={using.effect.imgURl}
          style={{
            width: "5rem",
            height: "5rem",
          }}
        /> */}
        <img
          src={`${EMOJI_URL}/${pet_map[stage][petAppearance]}`}
          style={{
            width: "12rem",
            height: "12rem",
          }}
        />
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
                <p
                  style={{
                    margin: "0 auto",
                    color: "red",
                  }}
                >
                  펫 이름를 입력해주세요
                </p>
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
