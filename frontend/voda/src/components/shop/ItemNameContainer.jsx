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

{
  /* <ItemNameContainer
            // style={
            //   item.own
            //     ? { opacity: 1 }
            //     : {
            //         opacity: 0.5,
            //         filter: "grayscale(75%)",
            //       }
            // }
            >
              <p style={{ margin: "0", fontWeight: "bold" }}>{item.name}</p>
            </ItemNameContainer> */
}
export default function ItemNameContainer({ name }) {
  return (
    <NameContainer>
      <p style={{ margin: "0", fontWeight: "bold" }}>{name}</p>{" "}
    </NameContainer>
  );
}
