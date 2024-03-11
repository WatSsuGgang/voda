import React from "react";
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
  // height: "100vh",
  width: "100vw",
});

const ButtonContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "3rem",
});

const Login = () => {
  return (
    <div>
      <ImageContainer>
        <img
          src={vodaLogo}
          alt=""
          style={{
            marginTop: "2.5rem",
            height: "85%",
            width: "85%",
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
      <ButtonContainer>
        <img src={btn_google} alt="" />
        <img src={btn_kakao} alt="" />
        <img src={btn_naver} alt="" />
      </ButtonContainer>
    </div>
  );
};

export default Login;
