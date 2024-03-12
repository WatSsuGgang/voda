import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LoginSuccess() {
  const params = useParams();
  // const [accessToken, setAccessToken] = useState(undefined);
  // const [email, setEmail] = useState(undefined);
  // const [provider, setProvider] = useState(undefined);

  useEffect(() => {
    const accessToken = params.accessToken;
    const email = params.email;
    const provider = params.provider;
    console.log("accessToken", accessToken);
    console.log("email", email);
    console.log("provider", provider);
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      window.location.href = "/";
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      window.location.href = "/login/nickname";
    }
  }, []);

  return <></>;
}
