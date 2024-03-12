import React from "react"; // eslint-disable-line no-unused-vars
import { Button } from "@mui/material";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StartRecord = () => {
  const navigate = useNavigate();
  const navigateRecord = () => {
    navigate("/voice/record");
  };
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "black",
        fontWeight: "bold",
        color: "black",
        width: "80vw",
      }}
      onClick={navigateRecord}
    >
      일기 쓰기
    </Button>
  );
};

export default StartRecord;
