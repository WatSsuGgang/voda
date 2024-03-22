import React from "react"; // eslint-disable-line no-unused-vars
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useUserStore from "../../store/userStore";
export default function BottomComponent() {
  const userStore = useUserStore();
  const month = new Date().getMonth() + 1;
  return (
    <div>
      <h3>
        {userStore.nickname}님의 {month}월은 어떠셨나요?
      </h3>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png"
          alt="Chart Increasing"
          width="100rem"
          height="100rem"
        />
        <Link
          to={"/user/report"}
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>
              VODA감정 통계 <br /> 확인 하러가기
            </p>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </Link>
      </Box>
    </div>
  );
}
