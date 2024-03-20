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
import { cleanString } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

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

  function onChangeHandler(e) {
    setNickname(e.target.value);
  }

  function onClickClearHandler() {
    setNickname("");
  }

  function onClickSignUpHandler() {
    console.log("버튼");
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
