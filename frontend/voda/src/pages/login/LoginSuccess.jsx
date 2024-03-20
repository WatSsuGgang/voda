import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

export default function LoginSuccess() {
  const [query] = useSearchParams();
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
    if (accessToken) {
      setIsLoggedIn(true);
      window.localStorage.setItem("accessToken", accessToken);
      // window.location.href = "/pet";
      navigate("/pet");
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      navigate("/login/nickname");
    }
  }, []);

  return <></>;
}
