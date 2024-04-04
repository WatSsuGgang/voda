import React from "react";
import styled, { keyframes, css } from "styled-components";
import EditAllow from "../../components/voicediary/EditAllow";
import StartRecord from "../../components/voicediary/StartRecord";

const TitleContainer = styled.div`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  margin-top: 10%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;
const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
`;
const Container = styled.div`
  animation: ${() =>
    css`
      ${blink} 0.5s ease-in-out
    `};
`;
const ContentBox = styled.div`
  margin-left: 5%;
`;

const Contents = styled.div`
  align-items: center;
  display: flex;
  margin: 20px 0;
`;
const Text = styled.div`
  margin-left: 3%;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Finish = styled.div`
  margin-top: 10%;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
  color: #0057ff;
  animation: ${() =>
    css`
      ${blink} 3s ease-in-out
    `};
`;

const VoiceDiary = () => {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <div>
      <TitleContainer>
        <img
          src={`${EMOJI_URL}/Objects/Microphone.png`}
          style={{
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
        <Title style={{ margin: 0 }}>오늘의 일기를 작성해보세요</Title>
      </TitleContainer>{" "}
      <ContentBox>
        <Contents>
          <img src="/images/voicediary/InnerPeace.png" alt="" />
          <Text>일기는 마음의 안정과 정신적인 조화를 증진시켜요</Text>
        </Contents>
        <Contents>
          <img src="/images/voicediary/Amnesia.png" alt="" />
          <Text>일기는 기억력을 향상시키는 데 효과적이에요</Text>
        </Contents>
        <Contents>
          <img src="/images/voicediary/Target.png" alt="" />
          <Text>일기는 목표를 설정하고 달성하는 데 도움을 줘요</Text>
        </Contents>
        <Contents>
          <img src="/images/voicediary/CreativeThinking.png" alt="" />
          <Text>일기를 꾸준히 작성하면 창의성을 성장시킬 수 있어요</Text>
        </Contents>
        <Contents>
          <img src="/images/voicediary/Microphone.png" alt="" />
          <Text>내가 쓴 일기를 음성으로 녹음할 수 있어요</Text>
        </Contents>
        <Contents>
          <img src="/images/voicediary/3NoIcon.png" style={{ width: "9vw" }} />
          <Text>
            일기는 하루에 <strong style={{ fontSize: "1.1rem" }}>3회</strong>
            까지만 작성할 수 있어요
          </Text>
        </Contents>
      </ContentBox>
      <div style={{ margin: "8%" }}>
        <Finish>
          일기 작성을 종료하시려면, <br />
          <strong style={{ fontSize: "1.3rem" }}>오늘 일기 끝</strong>이라고
          말해주세요
        </Finish>
      </div>
      <div style={{ marginTop: "6%" }}>
        <EditAllow />
      </div>
      <div style={{ margin: "5%", textAlign: "center" }}>
        <StartRecord />
      </div>
    </div>
  );
};

export default VoiceDiary;
