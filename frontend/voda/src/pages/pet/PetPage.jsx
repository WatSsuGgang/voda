import React, { useEffect, useState } from "react";
import TopBar from "../../components/pet/TopBar";
import TopComponent from "../../components/pet/TopComponent";
import MiddleComponent from "../../components/pet/MiddleComponent";
import Pet from "../../components/pet/Pet";
import PetTalk from "../../components/pet/PetTalk";
import { getPet } from "../../services/pet";

// data 형식
// data = {owned: [], pet: {emotion: "JOY", exp: 0, isEvolution: false, isFeed: true}}
const PetPage = () => {
  const [owned, setOwned] = useState([]);
  const [emotion, setEmotion] = useState(null);
  const [exp, setExp] = useState(null);
  const [isEvolution, setIsEvolution] = useState(null);
  const [isFeed, setIsFeed] = useState(null);
  const [level, setLevel] = useState(null);
  const [name, setName] = useState(null);
  const [petAppearance, setPetAppearance] = useState(null);
  const [petId, setPetId] = useState(null);
  const [stage, setStage] = useState(null);

  useEffect(() => {
    // 임시 memberId
    const fetchData = async () => {
      try {
        const response = await getPet(1);
        setOwned(response.owned);
        setEmotion(response.pet.emotion);
        setExp(response.pet.exp);
        setIsEvolution(response.pet.isEvolution);
        setIsFeed(response.pet.isFeed);
        setLevel(response.pet.level);
        setName(response.pet.name);
        setPetAppearance(response.pet.petAppearance);
        setPetId(response.pet.petId);
        setStage(response.pet.stage);
        return response;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        width: "85%",
        height: "85vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <TopBar />
        <TopComponent />
        <MiddleComponent />
      </div>
      <Pet />
      <PetTalk />
    </div>
  );
};

export default PetPage;
