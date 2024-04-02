import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import vodaLogo from "/logo.svg";
import vodaLogoLetter from "/logo_letter.svg";
import btn_google from "/login_btn/btn_google.svg";
import btn_naver from "/login_btn/btn_naver.svg";
import btn_kakao from "/login_btn/btn_kakao.svg";

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 65%;
  width: 65%;
  justify-content: center;
  align-items: center;
  animation: ${() =>
    css`
      ${blink} 4s ease-in-out
    `};
`;

const InstructionContainer = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 5rem;
  animation: ${() =>
    css`
      ${blink} 4s ease-in-out
    `};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  animation: ${() =>
    css`
      ${blink} 4s ease-in-out
    `};
`;

const Login = () => {
  const loginHandler = (e) => {
    const api_url = import.meta.env.VITE_API_URL;
    window.location.href = api_url + `/oauth2/authorization/${e.target.id}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageContainer>
        <img
          src={vodaLogo}
          alt="logo"
          style={{
            marginTop: "5rem",
            height: "100%",
            width: "100%",
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
        {/* <img
          src={btn_naver}
          alt=""
          id="naver"
          onClick={loginHandler}
          style={{
            width: "3rem",
            borderRadius: "100%",
          }}
        /> */}
      </ButtonContainer>
    </div>
  );
};

export default Login;
