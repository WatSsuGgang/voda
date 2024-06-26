import React from "react";
import { useUserStore } from "../../store/userStore";
import styled from "styled-components";

const HeaderComponent = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "85%",
  borderBottom: "1px solid #ccc",
});

export default function Header() {
  const { coins } = useUserStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <HeaderComponent style={{ zIndex: 99 }}>
      <h3>상점</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src={`${EMOJI_URL}/Objects/Coin.png`}
          alt="Coin"
          width="40rem"
          height="40rem"
        />
        <h3>{coins}</h3>
      </div>
    </HeaderComponent>
  );
}
