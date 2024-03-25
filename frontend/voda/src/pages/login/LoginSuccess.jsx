import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

export default function LoginSuccess() {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/pet");
    window.location.reload(true);
  };

  const handleNickName = () => {
    navigate("/nickname");
    window.location.reload(true);
  };

  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      handleHome();
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      handleNickName();
    }
  }, []);

  return <div></div>;
}
