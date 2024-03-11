import React from "react";
import myPageBackground from "../../assets/mypage/mypage_background.png";

const MyPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${myPageBackground})`,
        backgroundSize: "cover",
        height: "100vh",
        // width: "100vw",
        margin: "0 auto",
      }}
    ></div>
  );
};

export default MyPage;
