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
  console.log("넘어온 일기: ", diaries);
  const store = useStore();
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`${id}`);
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
    const emotionImageUrl = store.emotions[diary.diaryEmotion];
    const imageFile = diary.diaryFiles.filter(
      (file) => file.fileType === "IMG"
    );
    return (
      <div key={diary.diaryId}>
        <div
          onClick={() => goDetail(diary.diaryId)}
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          <img
            src={imageFile.fileUrl}
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
                {parseInt(diary.createdAt.slice(5, 7))}월
                {parseInt(diary.createdAt.slice(8, 10))}일
              </Date>
              <img
                src={emotionImageUrl}
                style={{ height: "4vh", width: "8vw" }}
              />
            </div>
            <div>{diary.diaryTitle}</div>
          </div>
        </div>
        <Line />
      </div>
    );
  });
  return <div>{diaryList}</div>;
};

export default FilterdDiaryList;
