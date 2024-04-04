import React from "react";
import styled from "styled-components";

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: #fff7b2;
`;

export default function ItemNameContainer({ bought = false, name }) {
  return (
    <NameContainer
      style={
        bought
          ? {
              backgroundColor: "#89ADAA",
            }
          : {
              backgroundColor: "#AFAB99",
            }
      }
    >
      <p style={{ margin: "0", fontWeight: "bold" }}>{name}</p>{" "}
    </NameContainer>
  );
}
