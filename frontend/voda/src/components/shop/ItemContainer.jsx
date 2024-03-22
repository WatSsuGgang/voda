import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff7b2;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  height: 5rem;
  text-align: center;
`;

{
  /* <ItemContainer
            // style={
            //   item.own
            //     ? { opacity: 1 }
            //     : {
            //         opacity: 0.5,
            //         filter: "grayscale(75%)",
            //       }
            // }
            >
              <img
                src={imgBaseURL + item.imgURl}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            </ItemContainer> */
}
export default function ItemContainer({ url }) {
  return (
    <Container>
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
