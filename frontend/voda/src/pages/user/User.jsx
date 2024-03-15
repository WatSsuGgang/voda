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
    console.log("일구refresh 들어왔어요");
    console.log("토큰: " + config.headers.Authorization);
    const response = await axios.post(url + "/token/refresh", {}, config);
    console.log("ilgooRefresh response", response);
    const refreshAccessToken = response.data.accessToken;
    if (response.status === 200) {
      alert("갱신 성공");
      console.log("response 200:", refreshAccessToken);
      localStorage.setItem("accessToken", refreshAccessToken);
      ilgooGet();
    } else if (response.status === 400) {
      alert("갱신 실패!");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  };

  const ilgooGet = async () => {
    try {
      const response = await axios.get(url + "/auth/ilgoo", config);
      console.log("ilgooGet", response);
      console.log("response status:", response.status);
    } catch (error) {
      console.log("일구refresh 들어갑니다");
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
