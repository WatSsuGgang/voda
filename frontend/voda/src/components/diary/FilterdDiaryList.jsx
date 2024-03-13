import React, { useState } from "react";
import styled from "styled-components";
import useStore from "../../store/store";
const Date = styled.div`
  background-color: #cad6c0;
  border-radius: 15px;
  max-width: 20vw;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  min-height: 2.5vh;
  padding: 0.2rem;
  margin-right: 0.5rem;
`;

const Line = styled.div`
  border: 0.1px solid #cacaca;
`;

const FilterdDiaryList = () => {
  const store = useStore();
  const diaries = [
    {
      id: 1,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
    {
      id: 2,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
    {
      id: 3,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
  ];
  if (diaries.length === 0) {
    return <div>No diaries found.</div>;
  }
  const diaryList = diaries.map((diary) => {
    const emotionImageUrl = store.emotions[diary.emotion];
    return (
      <div key={diary.id}>
        <div
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
                {diary.date.slice(5, 7)}월 {diary.date.slice(8, 10)}일
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
