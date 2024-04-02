import React from "react";
import styled from "styled-components";

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

export default function SignupButton({ onClick }) {
  return <Button onClick={onClick}>회원가입</Button>;
}
