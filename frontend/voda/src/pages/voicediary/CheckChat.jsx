import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBox from "../../components/voicediary/ChatBox";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { createDiary } from "../../services/voicediary"; // 대화 내역 불러오는 API 함수
import { useNavigate } from "react-router-dom";
import { getTalkList } from "../../services/voicediary";
import LodaingSpinner from "../../components/common/LoadingSpinner";
import Swal from "sweetalert2";
const Title = styled.h3`
  color: 486B73;
  text-align: center;
`;
const CheckChat = () => {
  const navigate = useNavigate();
  const diaryId = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const res = await getTalkList(diaryId.id);
    setMessages(res.data.talk_list);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    navigate("/pet");
    createDiary(diaryId.id, messages);
    Swal.fire({
      position: top,
      icon: "success",
      title: "일기 생성",
      html: `
      생성이 완료되면 알려드릴게요.
      `,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const exit = () => {
    Swal.fire({
      title: "일기 작성을 종료하시겠습니까?",
      text: "지금까지의 기록은 모두 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // 현재 오디오 스트림을 가져옴
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          // 오디오 스트림이 존재하면 연결된 트랙을 중지
          if (mediaStream) {
            const tracks = mediaStream.getTracks();
            console.log("미디어 스트림", mediaStream);
            console.log("track", tracks);
            tracks.forEach((track) => track.stop());
          }
        }
        // 다이어리 삭제
        await deleteDiary(diaryId);
        // 목적지로 이동
        navigate(destination);
      }
    });
  };
  return (
    <div>
      {loading ? (
        <LodaingSpinner />
      ) : (
        <div>
          <div
            style={{ marginTop: "10%", display: "flex", justifyContent: "end" }}
          >
            <LogoutIcon onClick={exit} />
          </div>
          <Title>대화 내용을 수정할 수 있어요</Title>
          <ChatBox messages={messages} onChildDataChange={setMessages} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4vh",
            }}
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
      )}
    </div>
  );
};

export default CheckChat;
