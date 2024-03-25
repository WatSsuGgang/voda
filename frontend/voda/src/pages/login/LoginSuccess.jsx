import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  // 홈화면으로 이동
  const handleHome = () => {
    navigate("/pet");
    window.location.reload(true);
  };

  // 회원가입 화면으로 이동
  const handleNickName = () => {
    navigate("/login/nickname");
    window.location.reload(true);
  };

  useEffect(() => {
    // 쿼리 파라미터에서 accessToken 가져오거나 email, provider 가져옴
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
    // accessToken이 있으면 홈화면으로 이동
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      handleHome();
      // email, provider 가 있으면 회원가입 화면으로 이동
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      handleNickName();
    }
  }, []);

  return <></>;
}
