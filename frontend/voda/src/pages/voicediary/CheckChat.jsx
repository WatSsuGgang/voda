import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBox from "../../components/voicediary/ChatBox";
import Button from "@mui/material/Button";

const Title = styled.h3`
  color: 486B73;
  text-align: center;
`;

const CheckChat = () => {
  const exit = () => {
    if (window.confirm("모든 내용은 삭제됩니다. 일기를 종료하시겠습니까?")) {
      navigate("/voice");
    }
  };
  return (
    <div>
      <div style={{ marginTop: "10%", display: "flex", justifyContent: "end" }}>
        <LogoutIcon onClick={exit} />
      </div>
      <Title>대화 내용을 수정할 수 있어요</Title>
      <ChatBox />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "4vh" }}
      >
        <Button variant="contained" style={{ backgroundColor: "#6C8CAC" }}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default CheckChat;
