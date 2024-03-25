import React, { useEffect, useState } from "react";
import { getUserInfo } from "../services/mypage";
import useUserStore from "../store/userStore";

export default function Start() {
  const userStore = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 유저 정보 받아오는 함수
  const fetchData = async () => {
    try {
      const response = await getUserInfo();
      userStore.setUserInfo(response.data);
      console.log(response);
    } catch (error) {
      console.log(response);
    }
  };

  // accessToken이 있으면 펫화면으로
  // 없으면 로그인이나 인트로로
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      window.location.href = "/pet";
    } else {
      const intro = localStorage.getItem("intro");
      if (intro == "no") {
        window.location.href = "/login";
      } else {
        window.location.href = "/intro";
      }
    }
  }, [isLoggedIn]);

  return <></>;
}
