import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const [query, setQuery] = useSearchParams();
  // const [accessToken, setAccessToken] = useState(undefined);
  // const [email, setEmail] = useState(undefined);
  // const [provider, setProvider] = useState(undefined);

  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
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
