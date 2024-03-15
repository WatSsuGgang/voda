import React, { useRef } from "react";
import { useLocation } from "react-router";
import useStore from "../../store/store";
import styled from "styled-components";
import trash from "../../assets/diarylist/trash.svg";
import save from "../../assets/diarylist/save.svg";
import playbutton from "../../assets/diarylist/playbutton.svg";
const Title = styled.h3`
  color: #486b73;
`;

const Container = styled.div`
  background-color: #f1f1f1;
  min-width: 90vw;
  min-height: 30vh;
  margin: 0 10px;
  border-radius: 15px;
  max-height: 62vh;
  overflow: auto;
`;
const DiaryDetail = () => {
  const store = useStore();
  const { state } = useLocation();
  const emotionImageUrl = store.emotions[state.emotion];
  const deleteDiary = (id) => {
    // api delete 요청 보내는 로직 구현 예정
  };

  const playVoice = () => {
    // 음성 파일을 재생시키는 로직 구현 예정
  };
  const handleDownloadClick = (url) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.download = `${state.date}.png`;
        aTag.click();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title>
          {store.nickname}님의 {parseInt(state.date.slice(5, 7))}/
          {parseInt(state.date.slice(8, 10))}
          일기
        </Title>
        <img
          src={emotionImageUrl}
          style={{ marginLeft: "1rem", height: "5vh", width: "10vw" }}
        />
      </div>
      <Container>
        <div
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {state.title}
        </div>
        {/* 상단 바 -> 사진 저장, 날짜, 게시글 삭제 버튼 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 0.8rem",
          }}
        >
          <img src={save} onClick={() => handleDownloadClick(state.picture)} />
          <div style={{ display: "flex" }}>
            {state.date}
            <img src={trash} style={{ marginLeft: "0.5rem" }} />
          </div>
        </div>
        {/* 일기 이미지 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={state.picture}
            style={{ width: "80%", height: "50%", borderRadius: "10%" }}
          />
        </div>
        {/* 일기 내용 */}
        <div style={{ padding: "2rem" }}>{state.content}</div>
      </Container>
      {/* 녹음 파일 재생 버튼 */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <img src={playbutton} />
      </div>
    </div>
  );
};

export default DiaryDetail;
