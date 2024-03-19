import React from "react";
import { useNavigate } from "react-router-dom";
import usePetShopStore from "../../store/petStore";

export default function TopBar() {
  const { currentCoin } = usePetShopStore();
  const navigate = useNavigate();
  function onClickShop() {
    navigate("/pet/shop");
  }
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
          alt="Coin"
          width="40rem"
          height="40rem"
        />
        <h3>{currentCoin}</h3>
      </div>
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Magic%20Wand.png"
        alt="Magic Wand"
        width="40rem"
        height="40rem"
        onClick={onClickShop}
      />
    </div>
  );
}
