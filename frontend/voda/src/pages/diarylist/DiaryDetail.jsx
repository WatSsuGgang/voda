import React from "react";
import { useLocation } from "react-router";
import useStore from "../../store/store";
import styled from "styled-components";
import trash from "../../assets/diarylist/trash.svg";
import save from "../../assets/diarylist/save.svg";
const Title = styled.h3`
  color: #486b73;
`;

const Container = styled.div`
  background-color: #f1f1f1;
  width: 20rem;
  height: 25rem;
  margin: 0 auto;
  border-radius: 15px;
`;
const DiaryDetail = () => {
  const store = useStore();
  const { state } = useLocation();
  const emotionImageUrl = store.emotions[state.emotion];
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
          {store.nickname}님의 {state.date.slice(5, 7)}/
          {state.date.slice(8, 10)}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={save} alt="" />
          <div style={{ display: "flex" }}>
            {state.date}
            <img src={trash} alt="" />
          </div>
        </div>
        <div>내용입니다.</div>
      </Container>
    </div>
  );
};

export default DiaryDetail;
