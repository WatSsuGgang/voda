import React, { useState, useEffect } from "react";
import useStore from "../../store/store";
import styled from "styled-components";
import FilteringBox from "../../components/diary/FilteringBox";
import FilterdDiaryList from "../../components/diary/FilterdDiaryList";
import { getDiaryList } from "../../services/diarylist";
import LodaingSpinner from "../../components/common/LoadingSpinner";
import { useUserStore } from "../../store/userStore";
const Title = styled.h3`
  text-align: center;
`;
const Container = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  margin-top: 10%;
`;
const DiaryList = () => {
  const store = useStore();
  const userStore = useUserStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [diaryList, setDiaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDiaries = async (start, end, emo) => {
    const res = await getDiaryList(start, end, emo);
    setDiaryList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getDiaries(startDate, endDate, emotion);
  }, [startDate, endDate, emotion]);

  return (
    <div>
      {loading ? (
        <LodaingSpinner />
      ) : (
        <div>
          <Title>{userStore.nickname}님의 일기를 확인해보세요</Title>
          <div>
            <div style={{ marginTop: "5%" }}>
              <FilteringBox
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setEmotion={setEmotion}
              />
            </div>
            <Container>
              <FilterdDiaryList diaries={diaryList} />
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryList;
