import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import EditAllow from "../../components/voicediary/EditAllow";
import StartRecord from "../../components/voicediary/StartRecord";
const Title = styled.h1`
  margin-top: 15%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ContentBox = styled.div`
  margin-left: 5%;
  margin-top: 20%;
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
  margin-top: 20%;
  text-align: center;
  font-size: 1rem;
  color: #0057ff;
`;

const VoiceDiary = () => {
  return (
    <div>
      <Title>오늘의 일기를 작성해보세요</Title>
      <ContentBox>
        <Contents>
          <img src="src/assets/voicediary/InnerPeace.png" alt="" />
          <Text>일기는 마음의 안정과 정신적인 조화를 증진시켜요</Text>
        </Contents>
        <Contents>
          <img src="src/assets/voicediary/Amnesia.png" alt="" />
          <Text>일기는 기억력을 향상시키는데 도움을 줘요</Text>
        </Contents>
        <Contents>
          <img src="src/assets/voicediary/Target.png" alt="" />
          <Text>일기는 목표를 설정하고 달성하는 데 도움을 줘요</Text>
        </Contents>
        <Contents>
          <img src="src/assets/voicediary/CreativeThinking.png" alt="" />
          <Text>일기는 창의성을 촉진하는 데 도움을 줘요</Text>
        </Contents>
        <Contents>
          <img src="src/assets/voicediary/Microphone.png" alt="" />
          <Text>내가 쓴 일기를 음성으로 녹음할 수 있어요</Text>
        </Contents>
      </ContentBox>
      <div style={{ margin: "8%" }}>
        <Finish>
          일기 작성을 종료하시려면, <strong>오늘 일기 끝</strong>이라고
          말해주세요
        </Finish>
      </div>
      <div style={{ marginTop: "6%", borderColor: "#" }}>
        <EditAllow />
      </div>
      <div style={{ marginTop: "3%", textAlign: "center" }}>
        <StartRecord />
      </div>
    </div>
  );
};

export default VoiceDiary;
