import React from "react";
import styled from "styled-components";
import { useStore } from "../../store/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20% auto;
`;

const AnalysisEmotion = ({ report }) => {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const store = useStore();
  const koreanEmotion = {
    joy: "기쁨",
    anger: "화남",
    sadness: "슬픔",
    fear: "두려움",
    curiosity: "호기심",
  };
  const emotionColor = {
    joy: "rgb(238, 238, 142)", // 파스텔 노랑
    anger: "rgb(232, 130, 130)", // 파스텔 분홍
    sadness: "rgb(147, 179, 241)", // 파스텔 파랑
    fear: "rgb(163, 163, 163)", // 파스텔 회색
    curiosity: "rgb(146, 228, 201)", // 파스텔 청록
  };
  let frequentEmotion = "";
  let total = 0;
  let maxValue = 0;
  const emotionUrl = [];
  for (const key in report.emotionStatics) {
    if (report.emotionStatics[key] >= maxValue) {
      maxValue = report.emotionStatics[key];
      frequentEmotion = key;
    }
    total += report.emotionStatics[key];
    emotionUrl.push({
      url: store.emotions[key.toUpperCase()],
      emotion: key,
      value: report.emotionStatics[key],
    });
  }

  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.4rem",
          marginBottom: "10%",
        }}
      >
        가장 많이 느낀 감정은 <br />'{koreanEmotion[frequentEmotion]}'이에요
      </div>
      <div>
        {emotionUrl.map((item, index) => {
          const percent = Math.round((item.value / total) * 100);
          return (
            <div
              key={index}
              style={{
                display: "flex",
                margin: "10% 0",
                alignItems: "center",
              }}
            >
              <img
                src={`${EMOJI_URL}/${item.url}`}
                alt="emotion"
                style={{ width: "20%" }}
              />
              <div
                style={{
                  width: `${percent + 20}%`,
                  backgroundColor: `${emotionColor[item.emotion]}`,
                  textAlign: "center",
                  borderRadius: "10px",
                  margin: "0 8%",
                  padding: "1.5% 0",
                }}
              >
                <div style={{ fontSize: "0.8rem" }}>{percent}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default AnalysisEmotion;
