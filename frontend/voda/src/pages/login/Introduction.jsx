import React from "react";
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import LoginButton from "../../components/login/LoginButton";

const Introduction = () => {
  return (
    <div
      style={
        {
          // backgroundColor: "#FFFAE1",
          // height: "100vh",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }
      }
    >
      <IntroductionCarousel />
      <LoginButton />
    </div>
  );
};

export default Introduction;
