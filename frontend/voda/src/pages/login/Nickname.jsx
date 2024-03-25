import React from "react"; // eslint-disable-line no-unused-vars
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth";
import styled from "styled-components";
import vodaLogo from "/logo.svg";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SignupButton from "../../components/login/SignupButton";

const ImageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Description = styled.p({
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: "5rem",
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
});

export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  // 닉네임 입력할 때 nickname 바인딩
  function onChangeHandler(e) {
    setNickname(e.target.value);
  }

  // x 버튼으로 입력한 닉네임 초기화(지우기)
  function onClickClearHandler() {
    setNickname("");
  }

  // 닉네임 길이가 0이면 닉네임 입력하라고 alert
  function onClickSignUpHandler() {
    // 닉네임을 제대로 입력했으면 email, provider, nickname 담아서 post 요청
    if (nickname.length > 0) {
      const data = {
        email: localStorage.getItem("email"),
        provider: localStorage.getItem("provider"),
        nickname: nickname,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      signUp(data, config);
      localStorage.removeItem("email");
      localStorage.removeItem("provider");
      navigate("/");
    } else {
      alert("닉네임을 입력해주세요");
    }
  }

  return (
    <>
      <ImageContainer>
        <img
          src={vodaLogo}
          alt="logo"
          style={{
            marginTop: "5rem",
            height: "65%",
            width: "65%",
          }}
        />
      </ImageContainer>
      <Description>사용할 닉네임을 입력해주세요</Description>
      <InputContainer>
        <TextField
          id="nickname-input"
          label="닉네임"
          variant="standard"
          onChange={onChangeHandler}
          value={nickname}
          style={{
            width: "65%",
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onClickClearHandler}>
                {nickname && <ClearIcon />}
              </IconButton>
            ),
          }}
        ></TextField>
        <SignupButton onClick={onClickSignUpHandler} />
      </InputContainer>
    </>
  );
}
