import React from "react"; // eslint-disable-line no-unused-vars
import { Button } from "@mui/material";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePersistStore } from "../../store/store";
const StartRecord = () => {
  const store = usePersistStore();
  const navigate = useNavigate();
  const navigateRecord = () => {
    navigate("/voice/record");
  };
  return (
    <Button
      variant="outlined"
      sx={
        store.darkmode
          ? {
              borderColor: "white",
              fontWeight: "bold",
              color: "white",
              width: "80vw",
            }
          : {
              borderColor: "black",
              fontWeight: "bold",
              color: "black",
              width: "80vw",
            }
      }
      onClick={navigateRecord}
    >
      일기 쓰기
    </Button>
  );
};

export default StartRecord;
