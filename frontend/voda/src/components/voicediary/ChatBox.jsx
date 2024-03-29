import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 3vh 1vh;
  max-height: 60vh;
  overflow: auto;
`;

const ChatBox = ({ messages, onChildDataChange }) => {
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    onChildDataChange(chatMessages);
  }, [chatMessages]);

  const handleChange = (index, value) => {
    const newContents = [...chatMessages];
    newContents[index] = { answer: value };
    setChatMessages(newContents);
  };

  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const { scrollHeight, clientHeight } = textareaRef.current;
      textareaRef.current.style.height = `${Math.max(
        scrollHeight,
        clientHeight
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [chatMessages]);

  const renderInputs = () => {
    return chatMessages.map((content, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: index % 2 === 1 ? "end" : "start",
            margin: "3vh 0",
          }}
        >
          <textarea
            ref={textareaRef}
            style={{
              border: "0",
              backgroundColor: index % 2 === 1 ? "#D8E5FF" : "#F2F2F2",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: "40vw",
              width: "auto",
              resize: "none",
              height: "auto",
              fontSize: "1rem",
              color: "#000",
            }}
            placeholder={index % 2 === 1 ? content.answer : content.question}
            value={index % 2 === 1 ? content.answer : content.question}
            onChange={(e) => handleChange(index, e.target.value)}
            readOnly={index % 2 === 0}
          />
        </div>
      );
    });
  };

  return <Container>{renderInputs()}</Container>;
};

export default ChatBox;
