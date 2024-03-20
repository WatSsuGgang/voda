import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import Button from '@mui/material';

const Button = styled.button({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#CAD6C0",
  fontWeight: "bold",
  border: "0px",
  alignItems: "center",
  width: "100%",
  height: "2.5rem",
  borderRadius: "10px",
  marginTop: "30vh",
});

export default function LoginButton() {
  const navigate = useNavigate();
  function clickHandler() {
    localStorage.setItem("intro", "no");
    navigate("/login");
  }
  return <Button onClick={clickHandler}>로그인하러 가기</Button>;
}
