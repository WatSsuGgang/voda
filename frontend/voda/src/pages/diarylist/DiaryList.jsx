import React from "react";
import useStore from "../../store/store";
import styled from "styled-components";
import FilteringBox from "../../components/diary/FilteringBox";
import FilterdDiaryList from "../../components/diary/FilterdDiaryList";
const Title = styled.h3`
  text-align: center;
`;
const DiaryList = () => {
  const store = useStore();

  return (
    <div>
      <Title>{store.nickname}님의 일기를 확인해보세요</Title>
      <div>
        <div style={{ marginTop: "5%" }}>
          <FilteringBox />
        </div>
        <div style={{ marginTop: "10%" }}>
          <FilterdDiaryList />
        </div>
      </div>
    </div>
  );
};

export default DiaryList;
