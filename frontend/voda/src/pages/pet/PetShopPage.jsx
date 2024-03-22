import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/shop/Header";
import CategoryBar from "../../components/shop/CategoryBar";
import ItemList from "../../components/shop/ItemList";
import usePetStore from "../../store/petStore";
import { getItem } from "../../services/item";

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
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function PetShopPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentCategory, setItems } = usePetStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItem(currentCategory);
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentCategory]);

  return (
    <Page>
      <TopComponents>
        <Header />
        <CategoryBar />
      </TopComponents>
      <ItemList />
    </Page>
  );
}
