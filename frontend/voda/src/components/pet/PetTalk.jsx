import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePetStore from "../../store/petStore";

const Chatbox = styled.div({
  borderRadius: "2rem",
  backgroundColor: "#686868",
  width: "70vw",
  color: "white",
  textAlign: "center",
  padding: "1rem",
});

export default function PetTalk(props) {
  const { emotion, isFeed } = usePetStore();
  const [message, setMessage] = useState("...");

  useEffect(() => {
    if (isFeed) {
      setMessage("배불러잉");
    } else {
      setMessage("배고파잉");
    }
  }, [message]);

  return (
    <>
      <Chatbox>{message}</Chatbox>
    </>
  );
}
