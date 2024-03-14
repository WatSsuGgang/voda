import React from "react"; // eslint-disable-line no-unused-vars
import myPageBackground from "../../assets/mypage/mypage_background.png";
import styled from "styled-components";
import { Box } from "@mui/material";
import TopComponent from "../../components/user/TopComponent";
import BottomComponent from "../../components/user/BottomComponent";
import axios from "axios";

const CustomBox = styled.div({
  backgroundImage: `url(${myPageBackground})`,
  backgroundSize: "cover",
  height: "85vh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

const User = () => {
  const url = import.meta.env.VITE_REACT_APP_SPRING_API;
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: accessToken,
    },
  };
  const ilgooRefresh = async () => {
    const response = await axios.post(url + "/token/refresh", config);
    const refreshAccessToken = response.data.accessToken;
    if (response.status === 200) {
      localStorage.setItem("accessToken", refreshAccessToken);
    } else if (response.status === 400) {
      alert("갱신 실패!");
    }
  };

  const ilgooGet = async () => {
    const response = await axios.get(url + "/auth/ilgoo", config);
    if (response.status === 401) {
      ilgooRefresh();
    }
  };
  return (
    <CustomBox>
      <button onClick={ilgooGet}>일구</button>
      <TopComponent />
      <BottomComponent />
    </CustomBox>
  );
};

export default User;
