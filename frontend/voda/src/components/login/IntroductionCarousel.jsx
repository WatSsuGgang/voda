import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function IntroductionCarousel() {
  const items = [
    {
      url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Zzz.png",
      alt: "Zzz",
      description: "잠들기 전에 하루를 기록하는 습관을 들여 보세요.",
    },
    {
      url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Deaf%20Man%20Light%20Skin%20Tone.png",
      alt: "Deaf Man with Light Skin Tone",
      description: "VODA AI가 듣고, 기록하고 멋있는 그림도 만들어 줄 거예요.",
    },
    {
      url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png",
      alt: "Hatching Chick",
      description:
        "일기에 기반한 감정에 따라 달라지는 귀여운 펫도 성장시켜 보세요.",
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
            <p>{item.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
