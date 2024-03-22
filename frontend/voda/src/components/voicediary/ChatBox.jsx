import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTalkList } from "../../services/voicediary"; // 대화 내역 불러오는 API 함수
const Container = styled.div`
  margin: 3vh 1vh;
  max-height: 55vh;
  overflow: auto;
`;

const ChatBox = ({ onChildDataChange }) => {
  // 음성 일기 더미 데이터. 화면 이동할 때, props로 넘겨주는 방식으로 구현 예정.
  // const [chatMessages, setChatMessages] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getTalkList(diaryId);
  //     setChatMessages(res[talk_list]);
  //   };
  //   fetchData();
  // }, []);

  // // 텍스트 수정이 일어날 때마다
  // useEffect(() => {
  //   onChildDataChange(chatMessages)
  // }, [chatMessages])

  // // 변화 추적
  // const handleChange = (index, value) => {
  //   const newContents = [...chatMessages];
  //   newContents[index] = value;
  //   setChildData(newContents);
  // };

  // const renderInputs = () => {
  //   return chatMessages.map((content, index) => {
  //     if (index % 2 === 1) {
  //       return (
  //         <div
  //           style={{ display: "flex", justifyContent: "end", margin: "3vh 0" }}
  //         >
  //           <input
  //             style={{
  //               border: "0",
  //               backgroundColor: "#D8E5FF",
  //               borderRadius: "10px",
  //               padding: "20px",
  //             }}
  //             key={index}
  //             placeholder={content}
  //             value={content}
  //             onChange={(e) => handleChange(index, e.target.value)}
  //           />
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "start",
  //             margin: "3vh 0",
  //           }}
  //         >
  //           <input
  //             style={{
  //               border: "0",
  //               backgroundColor: "#F2F2F2",
  //               borderRadius: "10px",
  //               padding: "20px",
  //             }}
  //             key={index}
  //             placeholder={content}
  //             value={content}
  //             disabled
  //           />
  //         </div>
  //       );
  //     }
  //   });
  // };

  // return <Container>{renderInputs()}</Container>;

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
