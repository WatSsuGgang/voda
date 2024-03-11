import React from "react"; // eslint-disable-line no-unused-vars
import { useState } from "react";
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
  // height: "100vh",
  width: "100vw",
});

const Description = styled.p({
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: "1.5rem",
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

  function onChangeHandler(e) {
    setNickname(e.target.value);
  }

  function onClickClearHandler() {
    setNickname("");
  }

  return (
    <>
      <ImageContainer>
        <img
          src={vodaLogo}
          alt="logo"
          style={{
            marginTop: "2.5rem",
            height: "85%",
            width: "85%",
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
        <SignupButton />
      </InputContainer>
    </>
  );
}
