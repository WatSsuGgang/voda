import React from "react"; // eslint-disable-line no-unused-vars
import myPageBackground from "/images/mypage/mypage_background.png";
import TopComponent from "../../components/user/TopComponent";
import BottomComponent from "../../components/user/BottomComponent";
import styled, { keyframes } from "styled-components";
import { usePersistStore } from "../../store/store";

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

// 스타일드 컴포넌트 생성
const WaveDarkBackground = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    -60deg,
    #000,
    #000,
    #000,
    #2f4858,
    #000,
    #000,
    #000
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
});

const User = () => {
  const store = usePersistStore();
  if (store.darkmode) {
    return (
      <WaveDarkBackground>
        <CustomBox>
          <TopComponent />
          <BottomComponent />
        </CustomBox>
      </WaveDarkBackground>
    );
  } else {
    return (
      <WaveBackground>
        <CustomBox>
          <TopComponent />
          <BottomComponent />
        </CustomBox>
      </WaveBackground>
    );
  }
};

export default User;
