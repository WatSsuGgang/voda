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
  return (
    <CustomBox>
      <TopComponent />
      <BottomComponent />
    </CustomBox>
  );
};

export default User;
