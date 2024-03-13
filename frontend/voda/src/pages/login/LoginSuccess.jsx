import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
    console.log("accessToken", accessToken);
    console.log("email", email);
    console.log("provider", provider);
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      navigate("/login/nickname");
    }
  }, []);

  return <></>;
}
