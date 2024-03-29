import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import IntroductionHeader from "../../components/login/IntroductionHeader";
import LoginButton from "../../components/login/LoginButton";
import PWAInstallButton from "../../components/common/PWAInstallButton.jsx";

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const IntroductionContainer = styled.div`
  width: 85%;
  margin: auto;
  padding: 5px;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 2s ease-in-out;
`;

const Instruction = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  animation: ${fadeInOut} 3s ease-in-out;
`;

const Introduction = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 2초 후에 다른 요소들을 보이도록 상태 업데이트
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <IntroductionContainer>
      {/* PWAInstallButton은 항상 화면에 나타남 */}
      <ContentContainer show={showContent}>
        <IntroductionHeader />
        <PWAInstallButton />
      </ContentContainer>
      {/* 안내 문구 */}
      <Instruction id="instruction" show={!showContent}>
        앱 설치를 원하시면 버튼을 클릭해주세요
      </Instruction>
      {/* 나머지 요소들은 트랜지션으로 나타남 */}
      {showContent && (
        <>
          <IntroductionCarousel />
          <LoginButton />
        </>
      )}
    </IntroductionContainer>
  );
};

export default Introduction;
