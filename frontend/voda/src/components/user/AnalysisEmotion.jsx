import React from "react";
import styled from "styled-components";
import useStore from "../../store/store";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20% auto;
`;
const AnalysisEmotion = ({ report }) => {
  const store = useStore();
  const koreanEmotion = {
    joy: "기쁨",
    anger: "화남",
    sadness: "슬픔",
    fear: "두려움",
    curiosity: "호기심",
  };
  let frequentEmotion = "";
  let total = 0;
  let maxValue = 0;
  const emotionUrl = [];
  for (const key in report.emotion_statics) {
    if (report.emotion_statics[key] >= maxValue) {
      maxValue = report.emotion_statics[key];
      frequentEmotion = key;
    }
    total += report.emotion_statics[key];
    emotionUrl.push({
      emotion: store.emotions[key.toUpperCase()],
      value: report.emotion_statics[key],
    });
  }

  return (
    <Container>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.4rem" }}
      >
        가장 많이 느낀 감정은 <br />'{koreanEmotion[frequentEmotion]}'이에요
      </div>
      <div>
        {emotionUrl.map((item, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", margin: "10% 0", alignItems: "center" }}
            >
              <img src={item.emotion} alt="emotion" style={{ width: "15%" }} />
              <div
                style={{
                  width: `${Math.round((item.value / total) * 100)}%`,
                  backgroundColor: "#FFE68E",
                  textAlign: "center",
                  borderRadius: "10px",
                  margin: "0 8%",
                  padding: "1.5% 0",
                }}
              >
                <div style={{ fontSize: "0.8rem" }}>
                  {Math.round((item.value / total) * 100)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default AnalysisEmotion;
