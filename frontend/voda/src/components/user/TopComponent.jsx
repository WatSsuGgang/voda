import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function TopComponent() {
  // const navigate = useNavigate();
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const url = import.meta.env.VITE_REACT_APP_SPRING_API;
    const data = {};
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    const response = await axios.post(url + "/token/logout", data, config);
    console.log(response);
    if (response.status === 200) {
      window.alert("로그아웃 성공");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } else {
      window.alert("로그아웃 실패");
    }
  };
  return (
    <div>
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
      <div>
        <h2>안녕하세요, 갓소민님!</h2>
        <h2>오늘 하루는 어떠셨나요?</h2>
      </div>
    </div>
  );
}
