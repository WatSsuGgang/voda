import React from "react"; // eslint-disable-line no-unused-vars
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import IntroductionHeader from "../../components/login/IntroductionHeader";
import LoginButton from "../../components/login/LoginButton";

const Introduction = () => {
  return (
    <div
      style={{
        width: "85%",
        margin: "auto",
      }}
    >
      <IntroductionHeader />
      <IntroductionCarousel />
      <LoginButton />
    </div>
  );
};

export default Introduction;
