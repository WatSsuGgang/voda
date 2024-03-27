import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 3vh 1vh;
  max-height: 55vh;
  overflow: auto;
`;

const ChatBox = ({ messages, onChildDataChange }) => {
  // 음성 일기 더미 데이터. 화면 이동할 때, props로 넘겨주는 방식으로 구현 예정.
  const [chatMessages, setChatMessages] = useState(messages);
  // 텍스트 수정이 일어날 때마다
  useEffect(() => {
    onChildDataChange(chatMessages);
  }, [chatMessages]);

  // 변화 추적
  const handleChange = (index, value) => {
    const newContents = [...chatMessages];
    newContents[index] = { answer: value };
    setChatMessages(newContents);
  };

  const renderInputs = () => {
    return chatMessages.map((content, index) => {
      if (index % 2 === 1) {
        return (
          <div
            key={index}
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
              placeholder={content.answer}
              value={content.answer}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        );
      } else {
        return (
          <div
            key={index}
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
              placeholder={content.question}
              value={content.question}
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
