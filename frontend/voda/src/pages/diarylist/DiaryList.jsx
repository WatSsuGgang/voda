import React, { useState } from "react";
import useStore from "../../store/store";
import styled from "styled-components";
import FilteringBox from "../../components/diary/FilteringBox";
import FilterdDiaryList from "../../components/diary/FilterdDiaryList";
const Title = styled.h3`
  text-align: center;
`;
const DiaryList = () => {
  const diaries = [
    {
      id: 1,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      content:
        "하... 인생이 많이 쓰다. 오늘은 술 한 잔 했다. 술이 달게 느껴진다. 진호는 왜 이렇게 잘 마시는거야? 피파 잘 하고 싶다. 가지 덮밥 생각보다 맛있다. Skrrr",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
    {
      id: 2,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      content:
        "하... 인생이 많이 쓰다. 오늘은 술 한 잔 했다. 술이 달게 느껴진다. 진호는 왜 이렇게 잘 마시는거야? 피파 잘 하고 싶다. 가지 덮밥 생각보다 맛있다. Skrrr",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
    {
      id: 3,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-10-11",
      emotion: "sad",
      content:
        "하... 인생이 많이 쓰다. 오늘은 술 한 잔 했다. 술이 달게 느껴진다. 진호는 왜 이렇게 잘 마시는거야? 피파 잘 하고 싶다. 가지 덮밥 생각보다 맛있다. Skrrr",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavVXxGrKkOn7bp0JcTSNO8yBlXnw4fihPPg&usqp=CAU",
    },
  ];
  const store = useStore();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [emotion, setEmotion] = useState("");

  const filterDiaries = diaries.filter((diary) => {
    let start = true;
    let end = true;
    let emo = true;
    const diaryDate = new Date(diary.date);
    if (startDate) {
      start = diaryDate >= new Date(startDate);
    }
    if (endDate) {
      end = diaryDate <= new Date(endDate);
    }
    if (emotion) {
      emo = diary.emotion === emotion;
    }
    return start && end && emo;
  });
  return (
    <div>
      <Title>{store.nickname}님의 일기를 확인해보세요</Title>
      <div>
        <div style={{ marginTop: "5%" }}>
          <FilteringBox
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setEmotion={setEmotion}
          />
        </div>
        <div style={{ marginTop: "10%" }}>
          <FilterdDiaryList diaries={filterDiaries} />
        </div>
      </div>
    </div>
  );
};

export default DiaryList;
