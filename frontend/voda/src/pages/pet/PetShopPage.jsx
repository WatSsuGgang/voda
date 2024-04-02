import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/shop/Header";
import CategoryBar from "../../components/shop/CategoryBar";
import ItemList from "../../components/shop/ItemList";
import { usePetStore } from "../../store/petStore";
import { usePersistStore } from "../../store/store";
import { getItem } from "../../services/item";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useStore } from "zustand";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopComponents = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const TopComponentsDark = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #212426;
`;

export default function PetShopPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false); // 추가: 로딩 상태 관리

  const { currentCategory, setBoughtItems, setDisplayItems } = usePetStore();
  const store = usePersistStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItem(currentCategory);
        setBoughtItems(response.data.bought);
        setDisplayItems(response.data.display);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [currentCategory]);

  useEffect(() => {
    setLoading(true); // 추가: 로딩 시작
    const timer = setTimeout(() => {
      setLoading(false); // 추가: 1.5초 후 로딩 종료
    }, 750);
    return () => clearTimeout(timer); // 추가: cleanup 함수
  }, [currentCategory]);

  return (
    <Page>
      {store.darkmode ? (
        <TopComponentsDark>
          <Header />
          <CategoryBar />
        </TopComponentsDark>
      ) : (
        <TopComponents>
          <Header />
          <CategoryBar />
        </TopComponents>
      )}
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <ItemList />
      )}
    </Page>
  );
}
