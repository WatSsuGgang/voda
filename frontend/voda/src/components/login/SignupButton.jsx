import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { Link } from "react-router-dom"; // eslint-disable-line no-unused-vars
import useStore from "../../store/store";
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

export default function SignupButton() {
  const { login } = useStore();

  function handleClickHandler() {
    login();
  }
  return (
    <>
      <Button onClick={handleClickHandler}>
        회원가입
        {/* <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
          }}
        >
          회원가입
        </Link> */}
      </Button>
    </>
  );
}
