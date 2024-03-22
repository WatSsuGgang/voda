import React from "react";
import styled from "styled-components";

const PriceContainer = styled.div`
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
`;

{
  /* <ItemCostContainer>
              {item.own ? (
                <>
                  {item.applied ? (
                    <>
                      <img
                        src={`${imgBaseURL}Symbols/Check%20Mark.png`}
                        alt="Check Mark"
                        width="20rem"
                        height="20rem"
                      />
                    </>
                  ) : (
                    <>
                      <p style={{ margin: "0", overflow: "hidden" }}>
                        {"보유중"}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <img
                    src={`${imgBaseURL}Objects/Coin.png`}
                    alt="Coin"
                    width="20rem"
                    height="20rem"
                  />
                  <p style={{ margin: "0", overflow: "hidden" }}>{item.cost}</p>
                </>
              )}
              <>
                <img
                  src={`${imgBaseURL}Objects/Coin.png`}
                  alt="Coin"
                  width="20rem"
                  height="20rem"
                />
                <p style={{ margin: "0", overflow: "hidden" }}>{item.price}</p>
              </>
            </ItemCostContainer> */
}

export default function ItemPriceContainer({ price }) {
  const imgBaseURL =
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/";

  const coinImgURL = `${imgBaseURL}Objects/Coin.png`;
  return (
    <PriceContainer>
      <>
        <img src={coinImgURL} alt="Coin" width="20rem" height="20rem" />
        <p style={{ margin: "0", overflow: "hidden" }}>{price}</p>
      </>
    </PriceContainer>
  );
}
