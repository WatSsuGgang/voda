import React, { useEffect, useState } from "react";
import TopBar from "../../components/pet/TopBar";
import TopComponent from "../../components/pet/TopComponent";
import MiddleComponent from "../../components/pet/MiddleComponent";
import Pet from "../../components/pet/Pet";
import PetTalk from "../../components/pet/PetTalk";
import { getPet } from "../../services/pet";
import { usePetStore, usePetPersistStore } from "../../store/petStore";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getUserInfo } from "../../services/mypage";
import { useUserStore } from "../../store/userStore";

const PetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    petMap,
    setUsing,
    setPetTouched,
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
  const { setUsingId, setUsingFoodId, setUsingEffectId } = usePetPersistStore();
  const { setUserInfo } = useUserStore();

  const userInfo = async () => {
    const res = await getUserInfo();
    setUserInfo(res.data);
  };
  const fetchData = async () => {
    try {
      const data = await getPet();
      setUsing(data.using);
      setUsingId({
        food: {
          itemId: data.using.food.item.itemId,
          ownId: data.using.food.ownId,
        },
        effect: {
          itemId: data.using.effect.item.itemId,
          ownId: data.using.effect.ownId,
        },
        name: `${data.pet.name}`,
        petImageUrl: `${petMap[data.pet.stage][data.pet.petAppearance]}`,
      });
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
      setTimeout(() => {
        setPetTouched(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    userInfo();
  }, []);
  return (
    <div>
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
          <LoadingSpinner />
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
    </div>
  );
};

export default PetPage;
