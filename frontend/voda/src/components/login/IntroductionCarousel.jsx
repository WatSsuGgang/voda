import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Description = styled.p({
  textAlign: "center",
  margin: 0,
  fontWeight: "bold",
});

export default function IntroductionCarousel() {
  // line1, line2로 나눈 이유: 줄바꿈 escape sequence(\n)가 안먹네요
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const items = [
    {
      url: `${EMOJI_URL}/Smilies/Zzz.png`,
      alt: "Zzz",
      line1: "잠들기 전에 하루를 기록하는",
      line2: "습관을 들여 보세요.",
    },
    {
      url: `${EMOJI_URL}/People%20with%20activities/Deaf%20Woman%20Light%20Skin%20Tone.png`,
      alt: "Deaf Woman with Light Skin Tone",
      line1: "VODA AI가 듣고, 기록하고",
      line2: "멋있는 그림도 만들어 줄 거예요.",
    },
    {
      url: `${EMOJI_URL}/Animals/Hatching%20Chick.png`,
      alt: "Hatching Chick",
      line1: "일기에 기반한 감정에 따라",
      line2: "달라지는 귀여운 펫도 성장시켜 보세요.",
    },
  ];

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

  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <img
              src={item.url}
              alt={item.alt}
              style={{ width: "100%", height: "100%" }}
            />
            <div
              style={{
                marginTop: "2vh",
                marginBottom: "2vh",
              }}
            >
              <Description>{item.line1}</Description>
              <Description>{item.line2}</Description>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
