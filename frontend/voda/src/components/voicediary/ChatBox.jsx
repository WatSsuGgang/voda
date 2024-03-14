import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  margin: 3vh 1vh;
  max-height: 55vh;
  overflow: auto;
`;

const ChatBox = (props) => {
  // 음성 일기 더미 데이터. 화면 이동할 때, props로 넘겨주는 방식으로 구현 예정.
  const questions = [
    "오늘 하루는 어땠어?",
    "왜 기분이 안 좋았어?",
    "나는 가지덮밥 별로던데허허허헣허허허",
  ];
  const answers = [
    "그냥 기분이 좋진 않았어",
    "가지덮밥을 못 먹었어",
    "니가 뭘 알아",
  ];
  const combinedContents = [];
  for (let i = 0; i < Math.max(questions.length, answers.length); i++) {
    if (questions[i]) combinedContents.push(questions[i]);
    if (answers[i]) combinedContents.push(answers[i]);
  }

  const [chatContents, setChatContents] = useState(combinedContents);

  //   console.log(chatContents);
  const handleChange = (index, value) => {
    const newContents = [...chatContents];
    newContents[index] = value;
    setChatContents(newContents);
  };

  const renderInputs = () => {
    return chatContents.map((content, index) => {
      if (index % 2 === 1) {
        return (
          <div
            style={{ display: "flex", justifyContent: "end", margin: "3vh 0" }}
          >
            <input
              style={{
                border: "0",
                backgroundColor: "#D8E5FF",
                borderRadius: "10px",
                padding: "20px",
              }}
              key={index}
              placeholder={content}
              value={content}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              margin: "3vh 0",
            }}
          >
            <input
              style={{
                border: "0",
                backgroundColor: "#F2F2F2",
                borderRadius: "10px",
                padding: "20px",
              }}
              key={index}
              placeholder={content}
              value={content}
              disabled
            />
          </div>
        );
      }
    });
  };

  return <Container>{renderInputs()}</Container>;
};

export default ChatBox;
