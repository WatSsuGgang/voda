import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBox from "../../components/voicediary/ChatBox";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { checkChat, createDiary } from "../../services/voicediary"; // 대화 내역 불러오는 API 함수
import { useNavigate } from "react-router-dom";
const Title = styled.h3`
  color: 486B73;
  text-align: center;
`;
const CheckChat = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([]);
  // useEffect(() => {
  //   const res = checkChat();
  //   setChatMessages(res["talk_list"]);
  // }, []);
  const { diaryId } = useParams();
  const data = { diaryId: diaryId, talk_list: chatMessages };
  const handleSubmit = () => {
    const res = checkChat(data);
    window.alert(
      "일기를 생성중입니다. 일기 생성이 완료되면 알림을 보내드릴게요"
    );
    navigate("/pet");
  };

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
      <ChatBox chatMessages={chatMessages} />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "4vh" }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ backgroundColor: "#6C8CAC" }}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default CheckChat;
