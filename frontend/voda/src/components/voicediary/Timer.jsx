import React, { useState, useEffect } from "react";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import styled from "styled-components";
const TimerStyle = styled.div`
  font-size: 1.5rem;
  color: #628f00;
`;
function Timer() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 시간 업데이트
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds + 1;
        const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
        return {
          minutes: newMinutes,
          seconds: newSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 시간을 포맷에 맞춰서 반환하는 함수
  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TimerStyle>{formatTime(time.minutes, time.seconds)}</TimerStyle>
      <StopCircleIcon style={{ marginLeft: "3%" }} />
    </div>
  );
}

export default Timer;
