import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30% auto;
`;
const LoadingReport = () => {
  const month = new Date().getMonth() + 1;
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <Container>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem", padding: "10%" }}>
        {month}월 일기 분석중 ...
      </div>
      <img
        src={`${EMOJI_URL}/People/Man%20Technologist.png`}
        alt="Technologist"
        width="300"
        height="300"
      />
    </Container>
  );
};
export default LoadingReport;
