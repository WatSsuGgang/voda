import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  return (
    <>
      <Button>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
          }}
        >
          로그인하러 가기
        </Link>
      </Button>
    </>
  );
}
