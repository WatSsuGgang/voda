import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerStyle = styled.div`
  font-size: 1.5rem;
  color: #628f00;
`;
function Timer({ aiSpeaking, setSpeakingTime }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    setTime(60);
    if (!aiSpeaking) {
      const intervalId = setInterval(() => {
        // 시간 업데이트
        setTime((prevTime) => {
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [aiSpeaking]);
  useEffect(() => {
    setSpeakingTime(time);
  }, [time]);
  // 시간을 포맷에 맞춰서 반환하는 함수
  const formatTime = (seconds) => {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <TimerStyle>{formatTime(time)}</TimerStyle>;
}

export default Timer;
