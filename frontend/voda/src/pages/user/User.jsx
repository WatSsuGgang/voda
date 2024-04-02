import React from "react"; // eslint-disable-line no-unused-vars
import myPageBackground from "/images/mypage/mypage_background.png";
import TopComponent from "../../components/user/TopComponent";
import BottomComponent from "../../components/user/BottomComponent";
import styled, { keyframes } from "styled-components";

// 배경 애니메이션 키프레임 정의
const waveAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// 스타일드 컴포넌트 생성
const WaveBackground = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    -60deg,
    #fff,
    #fff,
    #fff,
    #ddf2cc,
    #fff,
    #fff,
    #fff
  );
  background-size: 400% 400%;
  animation: ${waveAnimation} 10s ease infinite;
`;

const CustomBox = styled.div({
  backgroundSize: "cover",
  height: "85vh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#333", // 글씨 색상을 어두운 색으로 변경
});

const User = () => {
  return (
    <WaveBackground>
      <CustomBox>
        <TopComponent />
        <BottomComponent />
      </CustomBox>
    </WaveBackground>
  );
};

export default User;
