import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePetStore from "../../store/petStore";
import { getPetTalk } from "../../services/pet";

const Chatbox = styled.div({
  borderRadius: "2rem",
  backgroundColor: "#686868",
  width: "70vw",
  color: "white",
  textAlign: "center",
  padding: "1rem",
});

export default function PetTalk(props) {
  const { isFeed } = usePetStore();
  const [talk, setTalk] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPetTalk();
      setTalk(data.talk);
    };
  }, []);

  return (
    <>
      <Chatbox>{"talk"}</Chatbox>
    </>
  );
}
