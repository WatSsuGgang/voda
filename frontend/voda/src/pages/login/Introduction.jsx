import React from "react";
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import LoginButton from "../../components/login/LoginButton";

const Introduction = () => {
  return (
    <div
      style={
        {
          width: '85%',
          margin: 'auto',
        }
      }
    >
      <IntroductionCarousel />
      <LoginButton />
    </div>
  );
};

export default Introduction;
