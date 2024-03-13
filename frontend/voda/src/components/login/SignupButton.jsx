import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { Link, Router, useRoutes } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import useStore from "../../store/store";
// import Button from '@mui/material';

const Button = styled.button({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#CAD6C0",
  fontWeight: "bold",
  border: "0px",
  alignItems: "center",
  width: "85%",
  height: "2.5rem",
  borderRadius: "10px",
  marginTop: "20vh",
});

export default function SignupButton({ nickname }) {
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (!nickname) {
      alert("닉네임을 입력하세요");
    } else {
      const email = localStorage.getItem("email");
      const provider = localStorage.getItem("provider");
      const url = import.meta.env.VITE_REACT_APP_SPRING_API + "/auth/signup";
      const data = {
        email,
        provider,
        nickname,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(url, data, config);
      localStorage.removeItem("email");
      localStorage.removeItem("provider");
      console.log(response);
      if (response.status === 200) {
        window.alert("회원가입 성공");
      } else {
        window.alert("회원가입 실패");
      }

      navigate("/login");
    }
  };
  return (
    <>
      <Button onClick={handleSignup}>회원가입</Button>
    </>
  );
}
