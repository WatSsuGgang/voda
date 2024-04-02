import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function TopBar() {
  const { coins } = useUserStore();
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  const navigate = useNavigate();

  // 숫자를 한국어 표기로 변환하는 함수
  const formatNumber = (num) => {
    if (num < 10000) {
      // 1만 미만일 때는 그대로 반환
      return num;
    } else if (num < 100000000) {
      // 1억 미만일 때
      return `${(num / 10000).toFixed(1)}만`;
    } else if (num < 1000000000000) {
      // 1조 미만일 때
      return `${(num / 100000000).toFixed(1)}억`;
    }
  };

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
        {/* 코인 숫자를 한국어 표기로 변환하여 표시 */}
        <h3>{formatNumber(coins)}</h3>
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
