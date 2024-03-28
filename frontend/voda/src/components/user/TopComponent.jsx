import React, { useState } from "react";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserStore } from "../../store/userStore";
import { Modal } from "@mui/material";
import { editUserInfo } from "../../services/mypage";
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
export default function TopComponent() {
  const userStore = useUserStore();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [newName, setNewName] = useState("");
  const [isNewNameEmpty, setIsNewNameEmpty] = useState(false);
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };
  function newNameChangeHandler(e) {
    setNewName(e.target.value);
    setIsNewNameEmpty(false);
  }

  async function newNameSubmitHandler(e) {
    e.preventDefault();
    if (newName.length > 0) {
      const changedNickname = { newNickname: newName };
      const response = await editUserInfo(changedNickname);
      console.log(response);
      userStore.setUserInfo(response.data);
      setNewName("");
      handleCloseModal();
    } else {
      setIsNewNameEmpty(true);
    }
  }
  return (
    <div style={{ marginTop: "5vh" }}>
      <div>
        <h2>안녕하세요, {userStore.nickname}님!</h2>
        <h2>오늘 하루는 어떠셨나요?</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleLogout} style={{ margin: "0 5% 0 0" }}>
          <LogoutIcon />
        </IconButton>
        <Button
          style={{
            width: "32vw",
            height: "5vh",
            color: "white",
            fontWeight: "bold",
            backgroundColor: "#A6D1A5",
          }}
          onClick={handleOpenModal}
        >
          닉네임 변경
        </Button>
      </div>
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
              label="닉네임"
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
                닉네임을 입력해주세요
              </p>
            )}
            <Button variant="contained" onClick={newNameSubmitHandler}>
              저장
            </Button>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
}
