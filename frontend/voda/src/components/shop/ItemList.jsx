import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePetStore from "../../store/petStore";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import ItemContainer from "./ItemContainer";
import ItemNameContainer from "./ItemNameContainer";
import ItemPriceContainer from "./ItemPriceContainer";
import { buyItem } from "../../services/item";

const ItemWrapper = styled.div({
  display: "grid",
  width: "85%",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
  marginBottom: "6rem",
});

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 10rem;
  border-radius: 2rem;
  background-color: white;
  padding: 1rem;
`;

export default function ItemList() {
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const handleModalItemChange = (item) => {
    setModalItem(item);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const { items, setItems, owned, currentCategory, setCurrentCategory } =
    usePetStore();
  const imgBaseURL =
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/";
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentCategory(currentCategory);
  }, [currentCategory]);

  function checkName(name = "") {
    //name의 마지막 음절의 유니코드(UTF-16)
    const charCode = name.charCodeAt(name.length - 1);

    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;

    if (consonantCode === 0) {
      //0이면 받침 없음 -> 를
      return "를";
    }
    //1이상이면 받침 있음 -> 을
    return "을";
  }

  async function handleBuyItem() {
    await buyItem({ itemId: modalItem.itemId });
    handleCloseModal();
  }

  return (
    <ItemWrapper>
      {items.map((item, index) => (
        <div
          key={index}
          onTouchStart={() => {
            handleModalItemChange(item);
          }}
          onClick={handleOpenModal}
        >
          <div>
            <ItemNameContainer name={item.name} />
            <ItemContainer url={imgBaseURL + item.imgURl} />
            <ItemPriceContainer price={item.price} />
          </div>
        </div>
      ))}
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalBox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={imgBaseURL + modalItem.imgURl}
              style={{
                width: "3rem",
                height: "3rem",
              }}
            />
            <p
              style={{
                margin: "0",
              }}
            >
              <b>"{modalItem.name}"</b>
              {checkName(modalItem.name)} 구매하시겠습니까?
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleBuyItem}
              >
                구매
              </Button>
            </div>
          </div>
        </ModalBox>
      </Modal>
    </ItemWrapper>
  );
}
