import React from "react"; // eslint-disable-line no-unused-vars
import { Button } from "@mui/material";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// const SubmitButton = styled(Button)({
//   width: "100px",
//   height: "40px",
//   margin: "10px 0",
//   fontSize: "1.2rem",
//   fontWeight: "bold",
//   borderRadius: "10px",
//   backgroundColor: "#000000",
// });

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
