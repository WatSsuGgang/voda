import React from "react";
import styled from "styled-components";
import useStore from "../../store/store";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25% auto;
`;
const AnalysisDaily = ({ report }) => {
  const store = useStore();
  const days = Object.keys(report.weekly_statics);
  const koreanEmotion = {
    joy: "기쁨",
    anger: "화남",
    sadness: "슬픔",
    fear: "두려움",
    curiosity: "호기심",
  };
  const koreanDays = {
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
    sunday: "일요일",
  };
  return (
    <Container>
      {days.map((day, index) => {
        const emo = report.weekly_statics[day].emotion;
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.4rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {koreanDays[day]}은 이런 감정을 <br />
              가장 많이 느꼈어요
            </div>
            <img
              src={store.emotions[emo]}
              style={{ marginTop: "15%", width: "150px", height: "150px" }}
            />
            <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
              {koreanEmotion[emo.toLowerCase()]}
            </div>
            <div
              style={{
                margin: "18%",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {report.weekly_statics[day].summary}
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default AnalysisDaily;
