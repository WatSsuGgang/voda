import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

export default function TopBar() {
  const { coin } = useUserStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
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
          src={`${EMOJI_URL}/Objects/Coin.png`}
          alt="Coin"
          width="40rem"
          height="40rem"
        />
        <h3>{coin}</h3>
      </div>
      <img
        src={`${EMOJI_URL}/Activities/Magic%20Wand.png`}
        alt="Magic Wand"
        width="40rem"
        height="40rem"
        onClick={onClickShop}
      />
    </div>
  );
}
