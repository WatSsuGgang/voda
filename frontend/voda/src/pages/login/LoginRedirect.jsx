import React, { useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { postOAuthCode } from "../../services/auth";

export default function LoginRedirect(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  // 인가코드
  const code = searchParams.get("code");
  const provider = params.provider;

  // 인가코드 받고 백엔드에 보내기
  useEffect(() => {
    const oAuthLogin = async () => {
      const response = await postOAuthCode({ code, provider });
      console.log(response.data);
      // 오는 response에 따라 jwt 토큰 오면 login-success로
      // navigate("/login-success");

      // 그게 아니라 회원가입 절차가 온다면 nickname 으로
      // navigate("/nickname");
    };
    oAuthLogin();
    // navigate("/");
  }, [props.history]);
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
      }}
    >
      <CircularProgress></CircularProgress>
    </div>
  );
}
