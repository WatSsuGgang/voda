import React from "react";
import styled from "styled-components";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
const Date = styled.div`
  background-color: #cad6c0;
  border-radius: 15px;
  max-width: 20vw;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  min-height: 2.5vh;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const Line = styled.div`
  border: 0.1px solid #cacaca;
`;

const FilterdDiaryList = ({ diaries }) => {
  const store = useStore();
  const navigate = useNavigate();
  const goDetail = (id, diary) => {
    navigate(`${id}`, { state: diary });
  };

  if (diaries.length === 0) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Expressionless%20Face.png"
            alt="Expressionless Face"
            width="200"
            height="200"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          검색 조건에 맞는 일기가 없습니다.
        </div>
      </div>
    );
  }
  const diaryList = diaries.map((diary) => {
    const emotionImageUrl = store.emotions[diary.emotion];
    return (
      <div key={diary.id}>
        <div
          onClick={() => goDetail(diary.id, diary)}
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          <img
            src={diary.picture}
            style={{
              width: "25vw",
              height: "10vh",
              borderRadius: "20%",
              marginRight: "1rem",
            }}
          ></img>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", paddingBottom: "0.8rem" }}>
              <Date>
                {parseInt(diary.date.slice(5, 7))}월
                {parseInt(diary.date.slice(8, 10))}일
              </Date>
              <img
                src={emotionImageUrl}
                style={{ height: "4vh", width: "8vw" }}
              />
            </div>
            <div>{diary.title}</div>
          </div>
        </div>
        <Line />
      </div>
    );
  });
  return <div>{diaryList}</div>;
};

export default FilterdDiaryList;
