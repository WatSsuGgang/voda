import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import Calendar from "../../components/calendar/Calendar";
import styled from "styled-components";

const TitleContainer = styled.div`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;
const Title = styled.h1`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CalendarPage = () => {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <div>
      <TitleContainer>
        <img
          src={`${EMOJI_URL}/Objects/Calendar.png`}
          style={{
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
        <Title style={{ margin: 0 }}>감정 캘린더를 확인해보세요</Title>
      </TitleContainer>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
