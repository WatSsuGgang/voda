import React from "react"; // eslint-disable-line no-unused-vars
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useUserStore } from "../../store/userStore";
export default function BottomComponent() {
  const userStore = useUserStore();
  const month = new Date().getMonth() + 1;
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h3>
        {userStore.nickname}님의 {month}월은 어땠을까요?
      </h3>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          src={`${EMOJI_URL}/Objects/Chart%20Increasing.png`}
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
              marginLeft: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div>VODA감정 통계</div>
              <div>확인 하러가기</div>
            </div>

            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </Link>
      </Box>
    </div>
  );
}
