import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  height: 5rem;
  text-align: center;
`;

export default function ItemContainer({ bought, url }) {
  return (
    <Container
      style={
        bought
          ? {
              backgroundColor: "#BFE4E1",
            }
          : {
              backgroundColor: "#FFFAE1",
            }
      }
    >
      <img
        src={url}
        style={{
          width: "2.5rem",
          height: "2.5rem",
        }}
      />
    </Container>
  );
}
