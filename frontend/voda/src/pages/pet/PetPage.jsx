import React, { useEffect, useState } from "react";
import TopBar from "../../components/pet/TopBar";
import TopComponent from "../../components/pet/TopComponent";
import MiddleComponent from "../../components/pet/MiddleComponent";
import Pet from "../../components/pet/Pet";
import PetTalk from "../../components/pet/PetTalk";
import { getPet } from "../../services/pet";
import usePetStore from "../../store/petStore";
import { CircularProgress } from "@mui/material";

// data 형식
// data = {owned: [], pet: {emotion: "JOY", exp: 0, isEvolution: false, isFeed: true}}
const PetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    setUsingFoodImgURl,
    setUsingEffectImgURl,
    setEmotion,
    setExp,
    setIsEvolution,
    setIsFeed,
    setLevel,
    setName,
    setPetAppearance,
    setPetId,
    setStage,
  } = usePetStore();
  useEffect(() => {
    // 임시 memberId

    const fetchData = async () => {
      try {
        const data = await getPet();
        setUsingFoodImgURl(data.map.food.item.imgURl);
        setUsingEffectImgURl(data.map.effect.item.imgURl);
        setEmotion(data.pet.emotion);
        setExp(data.pet.exp);
        setIsEvolution(data.pet.isEvolution);
        setIsFeed(data.pet.isFeed);
        setLevel(data.pet.level);
        setName(data.pet.name);
        setPetAppearance(data.pet.petAppearance);
        setPetId(data.pet.petId);
        setStage(data.pet.stage);
        setIsLoading(false);
        console.log(data);
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default PetPage;
