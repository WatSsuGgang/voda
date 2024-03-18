import React from "react";
import styled from "styled-components";

const Chatbox = styled.div({
  borderRadius: "2rem",
  backgroundColor: "#686868",
  width: "70vw",
  color: "white",
  textAlign: "center",
  padding: "1rem",
});

export default function PetTalk(props) {
  return (
    <>
      <Chatbox>일기 써 줘.</Chatbox>
    </>
  );
}
