import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePetStore, usePetPersistStore } from "../../store/petStore";
import { useUserStore } from "../../store/userStore";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import ItemContainer from "./ItemContainer";
import ItemNameContainer from "./ItemNameContainer";
import ItemPriceContainer from "./ItemPriceContainer";
import { buyItem, applyItem } from "../../services/item";
import { getItem } from "../../services/item";
import { getUserInfo } from "../../services/mypage";

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
  const [modalItemOwnId, setModalItemOwnId] = useState();

  // 구매 모달
  const [openModal, setOpenModal] = useState(false);

  // 착용 모달
  const [openBoughtModal, setOpenBoughtModal] = useState(false);

  const { usingId } = usePetPersistStore();
  const {
    setBoughtItems,
    setDisplayItems,
    boughtItems,
    displayItems,
    currentCategory,
    setCurrentCategory,
  } = usePetStore();
  const { setUserInfo } = useUserStore();
  const { coins } = useUserStore();
  const navigate = useNavigate();

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
    if (coins >= modalItem.price) {
      // 사면 ownId 넘겨주는거
      await buyItem({
        itemId: modalItem.itemId,
        price: modalItem.price,
      })
        .then(() => {
          const fetchData = async () => {
            try {
              const itemResponse = await getItem(currentCategory);
              const userResponse = await getUserInfo();
              setUserInfo(userResponse.data);
              setBoughtItems(itemResponse.data.bought);
              setDisplayItems(itemResponse.data.display);
            } catch (error) {
              console.error();
            }
          };
          fetchData();
        })
        .catch(() => {});

      handleCloseModal();
    }
  }
  async function handleApplyItem() {
    try {
      const response = await applyItem(modalItemOwnId);
    } catch (error) {}
    handleCloseModal();
    navigate("/pet");
  }
  return (
    <>
      <ItemWrapper>
        {boughtItems.map((item, index) => {
          if (item.item.itemCategory === currentCategory.toUpperCase()) {
            return (
              <div
                key={index}
                onTouchStart={() => {
                  handleModalItemChange(item.item);
                  setModalItemOwnId(item.ownId);
                }}
                onClick={handleOpenBoughtModal}
              >
                <div>
                  <ItemNameContainer bought={true} name={item.item.name} />
                  <ItemContainer
                    bought={true}
                    url={`${EMOJI_URL}/${item.item.imgURl}`}
                  />
                  <ItemPriceContainer
                    status={item.itemStatus}
                    price={item.item.price}
                  />
                </div>
              </div>
            );
          }
        })}

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
                {coins >= modalItem.price
                  ? "구매하시겠습니까?"
                  : "구매할 돈이 모자라요"}
              </p>
              {coins >= modalItem.price ? (
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
              {}
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
                {`${checkName(modalItem.name)} 착용하시겠습니까?`}
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
    </>
  );
}
