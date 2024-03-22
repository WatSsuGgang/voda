import React, { useEffect, useState } from "react"; // eslint-disable-line
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

export default function LoginSuccess() {
  const [query] = useSearchParams();
  const [testAccessToken, setTestAccessToken] = useState("토큰 초기값");
  const [testEmail, setTestEmail] = useState("이메일 초기값");
  const [testProvider, setTestProvider] = useState("프로바이더 초기값");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = query.get("accessToken");
    const email = query.get("email");
    const provider = query.get("provider");
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      setTestAccessToken(accessToken);
      // window.location.href = "/pet";
      // navigate("/pet");
    } else if (email && provider) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("provider", provider);
      setTestEmail(email);
      setTestProvider(provider);
      // navigate("/login/nickname");
    }
  }, []);

  function ilgooHandler() {
    if (testAccessToken !== "토큰 초기값") {
      navigate("/pet");
    } else {
      navigate("/login/nickname");
    }
  }

  return (
    <div>
      <h1>Login Success</h1>
      <h2>accessToken : {testAccessToken}</h2>
      <h2>email : {testEmail}</h2>
      <h2>provider : {testProvider}</h2>
      <button onClick={ilgooHandler}>일구</button>
    </div>
  );
}
