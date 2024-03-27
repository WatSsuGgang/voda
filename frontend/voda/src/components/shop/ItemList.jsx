import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePetStore, usePetPersistStore } from "../../store/petStore";
import { useUserStore } from "../../store/userStore";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import ItemContainer from "./ItemContainer";
import ItemNameContainer from "./ItemNameContainer";
import ItemPriceContainer from "./ItemPriceContainer";
import { buyItem, applyItem } from "../../services/item";

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
  const [modalItem, setModalItem] = useState({});

  // 구매 모달
  const [openModal, setOpenModal] = useState(false);

  // 착용 모달
  const [openBoughtModal, setOpenBoughtModal] = useState(false);

  const { usingId } = usePetPersistStore();
  const { boughtItems, displayItems, currentCategory, setCurrentCategory } =
    usePetStore();
  const { coin } = useUserStore();

  const handleModalItemChange = (item) => {
    setModalItem(item);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenBoughtModal = () => {
    if (modalItem.itemId !== usingId[currentCategory].itemId) {
      setOpenBoughtModal(true);
    }
  };

  const handleCloseBoughtModal = () => setOpenBoughtModal(false);

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
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
    if (coin >= modalItem.price) {
      await buyItem({ itemId: modalItem.itemId, price: modalItem.price });
      handleCloseModal();
    }
  }

  async function handleApplyItem() {
    try {
      const data = await applyItem(usingId[currentCategory].ownId);
      console.log(data);
    } catch (error) {}
    handleCloseModal();
  }

  return (
    <ItemWrapper>
      {boughtItems.map((item, index) => (
        <div
          key={index}
          onTouchStart={() => {
            handleModalItemChange(item);
          }}
          onClick={handleOpenBoughtModal}
        >
          <div>
            <ItemNameContainer bought={true} name={item.name} />
            <ItemContainer bought={true} url={`${EMOJI_URL}/${item.imgURl}`} />
            <ItemPriceContainer
              using={usingId[currentCategory].itemId === item.itemId}
              bought={true}
              price={item.price}
            />
          </div>
        </div>
      ))}
      {displayItems.map((item, index) => (
        <div
          key={index}
          onTouchStart={() => {
            handleModalItemChange(item);
          }}
          onClick={handleOpenModal}
        >
          <div>
            <ItemNameContainer name={item.name} />
            <ItemContainer url={`${EMOJI_URL}/${item.imgURl}`} />
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
              src={`${EMOJI_URL}/${modalItem.imgURl}`}
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
              {checkName(modalItem.name)}{" "}
              {coin >= modalItem.price
                ? "구매하시겠습니까?"
                : "구매할 돈이 모자라요"}
            </p>
            {coin >= modalItem.price ? (
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
                  color={"success?"}
                  onClick={handleBuyItem}
                >
                  구매
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              ></div>
            )}
          </div>
        </ModalBox>
      </Modal>

      <Modal open={openBoughtModal} onClose={handleCloseBoughtModal}>
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
              src={`${EMOJI_URL}/${modalItem.imgURl}`}
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
              {`${checkName(modalItem.name)}을 착용하시겠습니까?`}
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
                color={"success"}
                onClick={handleApplyItem}
              >
                착용
              </Button>
            </div>
          </div>
        </ModalBox>
      </Modal>
    </ItemWrapper>
  );
}
