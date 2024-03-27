import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function TopComponent() {
  const userStore = useUserStore();
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };
  return (
    <div style={{ marginTop: "5vh" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleLogout} style={{ margin: "0 5% 0 0" }}>
          <LogoutIcon />
        </IconButton>
        <button>닉네임 수정</button>
      </div>
      <div>
        <h2>안녕하세요, {userStore.nickname}님!</h2>
        <h2>오늘 하루는 어떠셨나요?</h2>
      </div>
    </div>
  );
}
