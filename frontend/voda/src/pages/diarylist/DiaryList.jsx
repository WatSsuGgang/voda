import React, { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import styled from "styled-components";
import FilteringBox from "../../components/diary/FilteringBox";
import FilterdDiaryList from "../../components/diary/FilterdDiaryList";
import { getDiaryList } from "../../services/diarylist";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useUserStore } from "../../store/userStore";

const TitleContainer = styled.div`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Container = styled.div`
  max-height: 67vh;
  overflow-y: scroll;
  margin-top: 5%;
`;

const DiaryList = () => {
  const store = useStore();
  const userStore = useUserStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [diaryList, setDiaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;

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
        <LoadingSpinner />
      ) : (
        <div>
          <TitleContainer>
            <img
              src={`${EMOJI_URL}/Objects/Notebook.png`}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
            <Title style={{ margin: 0 }}>일기 목록을 확인해보세요</Title>
          </TitleContainer>
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
