import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/pet");
    window.location.reload(true);
  };

  const handleNickName = () => {
    navigate("/login/nickname");
    window.location.reload(true);
  };

  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");

    const fetchData = async () => {
      try {
        if (accessToken) {
          window.localStorage.setItem("accessToken", accessToken);
          handleHome();
        } else if (email && provider) {
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("provider", provider);
          handleNickName();
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}
