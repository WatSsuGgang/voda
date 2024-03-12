import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import vodaLogo from "/logo.svg";
import vodaLogoLetter from "/logo_letter.svg";
import btn_google from "/login_btn/btn_google.svg";
import btn_naver from "/login_btn/naver.png";
import btn_kakao from "/login_btn/kakao.png";
import axios from "axios";

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

const providerList = [
  {
    text: "kakao",
    href: "https://localhost:3000/oauth2/authorization/kakao",
  },
  {
    text: "naver",
    href: "https://localhost:3000/oauth2/authorization/naver",
  },
  {
    text: "google",
    href: "https://localhost:3000/oauth2/authorization/google",
  },
];

const Login = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_SPRING_API;
  // const signupHandler = async () => {
  // const response = await axios.get(
  //   BASE_URL + "/oauth2/authorization/kakao",
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       withCredentials: true,
  //     },
  //   }
  // );
  // console.log(response);
  // const user = response.data.user;
  // const accessToken = response.headers["access_token"];
  // const refreshToken = response.headers["refresh_token"];
  // };

  function clickHandler(e) {
    e.preventDefault();
    window.location.href = BASE_URL + `/oauth2/authorization/${e.target.id}`;
  }
  return (
    <div>
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
        <img
          src={vodaLogoLetter}
          alt=""
          style={{
            marginTop: "1.5rem",
          }}
        />
      </ImageContainer>
      <ButtonContainer>
        <img src={btn_google} alt="" id="google" onClick={clickHandler} />
        <img
          src={btn_kakao}
          alt=""
          id="kakao"
          onClick={clickHandler}
          style={{
            width: "85%",
          }}
        />
        <img
          src={btn_naver}
          alt=""
          id="naver"
          onClick={clickHandler}
          style={{
            width: "85%",
          }}
        />
      </ButtonContainer>
    </div>
  );
};

export default Login;
