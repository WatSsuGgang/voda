import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/mypage";
import useUserStore from "../store/userStore";
export default function Start() {
  const userStore = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchData = async () => {
    try {
      const response = await getUserInfo();
      userStore.setUserInfo(response.data);
      console.log(response);
    } catch (error) {
      console.log(response);
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      console.log("아아");
      // fetchData();
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
