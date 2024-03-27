import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/shop/Header";
import CategoryBar from "../../components/shop/CategoryBar";
import ItemList from "../../components/shop/ItemList";
import { usePetStore } from "../../store/petStore";
import { getItem } from "../../services/item";
import { CircularProgress } from "@mui/material";

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
  const { currentCategory, setBoughtItems, setDisplayItems } = usePetStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItem(currentCategory);
        setBoughtItems(response.data.bought);
        setDisplayItems(response.data.display);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [currentCategory]);

  return (
    <Page>
      <TopComponents>
        <Header />
        <CategoryBar />
      </TopComponents>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ItemList />
      )}
    </Page>
  );
}
