import React from "react";
import styled from "styled-components";
import { useStore } from "../../store/store";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25% auto;
`;
const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  autoplay: true,
  autoplaySpeed: 5000,
  initialSlide: 0,
  arrows: false,
  fade: false,
  cssEase: "linear",
};
const AnalysisDaily = ({ report }) => {
  const store = useStore();
  const days = Object.keys(report.weeklyStatics);
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
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <Slider {...settings}>
      {days.map((day, index) => (
        <Container key={index}>
          {report.weeklyStatics[day].emotion === "NONE" ? (
            <div
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
                {koreanDays[day]}에 작성한 일기가 없습니다
              </div>
              <img
                src={`${EMOJI_URL}/Smilies/Expressionless%20Face.png`}
                alt="Expressionless Face"
                width="150"
                height="150"
                style={{ marginTop: "15%" }}
              />
            </div>
          ) : (
            <div
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
                src={`${EMOJI_URL}/${
                  store.emotions[report.weeklyStatics[day].emotion]
                }`}
                style={{
                  marginTop: "15%",
                  width: "150px",
                  height: "150px",
                }}
              />
              <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                {koreanEmotion[report.weeklyStatics[day].emotion.toLowerCase()]}
              </div>
              <div
                style={{
                  margin: "18%",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {report.weeklyStatics[day].summary}
              </div>
            </div>
          )}
        </Container>
      ))}
    </Slider>
  );
};

export default AnalysisDaily;
