import React from "react";
import styled from "styled-components";
import { useStore } from "../../store/store";
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

const FilterdDiaryList = ({ diaries }) => {
  console.log("넘어온 일기: ", diaries);
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
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
            src={`${EMOJI_URL}/Smilies/Expressionless%20Face.png`}
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
      (file) => file.fileType === "WEBP"
    );
    return (
      <div
        key={diary.diaryId}
        style={{
          border: "1px solid",
          borderColor: "#cacaca",
          borderRadius: "15px",
          padding: "0.5rem",
          margin: "0.5rem",
        }}
      >
        <div
          onClick={() => goDetail(diary.diaryId)}
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          <img
            src={imageFile.length > 0 ? imageFile[0].fileUrl : ""}
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
                src={`${EMOJI_URL}/${emotionImageUrl}`}
                style={{ height: "4vh", width: "8vw" }}
              />
            </div>
            <div>{diary.diaryTitle}</div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{diaryList}</div>;
};

export default FilterdDiaryList;
