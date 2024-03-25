import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import vodaLogo from "/logo.svg";
import vodaLogoLetter from "/logo_letter.svg";
import btn_google from "/login_btn/btn_google.svg";
import btn_naver from "/login_btn/btn_naver.svg";
import btn_kakao from "/login_btn/btn_kakao.svg";

const ImageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const InstructionContainer = styled.p({
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: "5rem",
});

const ButtonContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  marginTop: "1.5rem",
});

const Login = () => {
  const loginHandler = (e) => {
    const api_url = import.meta.env.VITE_API_URL;
    window.location.href = api_url + `/oauth2/authorization/${e.target.id}`;
  };

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
        <img
          src={vodaLogoLetter}
          alt=""
          style={{
            marginTop: "1.5rem",
          }}
        />
      </ImageContainer>
      <InstructionContainer>SNS로 간편 로그인</InstructionContainer>
      <ButtonContainer>
        <img
          src={btn_google}
          alt=""
          id="google"
          onClick={loginHandler}
          style={{
            width: "3rem",
          }}
        />
        <img
          src={btn_kakao}
          alt=""
          id="kakao"
          onClick={loginHandler}
          style={{
            width: "3rem",
          }}
        />
        <img
          src={btn_naver}
          alt=""
          id="naver"
          onClick={loginHandler}
          style={{
            width: "3rem",
            borderRadius: "100%",
          }}
        />
      </ButtonContainer>
    </>
  );
};

export default Login;
