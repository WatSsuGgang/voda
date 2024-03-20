import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate;
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
