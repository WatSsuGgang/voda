import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30% auto;
`;
const AnalysisCount = ({ report }) => {
  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.4rem",
          marginBottom: "5%",
        }}
      >
        이번달 일기는 <br />총 {report.diaryCount}번 기록했어요
      </div>
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Writing%20Hand%20Medium-Light%20Skin%20Tone.png"
        alt="Writing Hand Medium-Light Skin Tone"
        width="300"
        height="300"
      />
    </Container>
  );
};

export default AnalysisCount;
