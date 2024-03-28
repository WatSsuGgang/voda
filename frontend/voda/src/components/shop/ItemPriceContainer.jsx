import React from "react";
import styled from "styled-components";

const PriceContainer = styled.div`
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
`;

export default function ItemPriceContainer({ status = "UNBOUGHT", price }) {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const coinImgURL = `${EMOJI_URL}/Objects/Coin.png`;
  if (status === "UNBOUGHT") {
    return (
      <PriceContainer>
        <img src={coinImgURL} alt="Coin" width="20rem" height="20rem" />
        <p style={{ margin: "0", overflow: "hidden" }}>{price}</p>
      </PriceContainer>
    );
  } else {
    if (status === "OWNED") {
      return (
        <PriceContainer>
          <p style={{ margin: "0", overflow: "hidden" }}>{"보유중"}</p>
        </PriceContainer>
      );
    } else {
      return (
        <PriceContainer>
          <img
            src={`${EMOJI_URL}/Symbols/Check%20Mark.png`}
            alt="Check Mark"
            width="20rem"
            height="20rem"
          />
        </PriceContainer>
      );
    }
  }
}
