import axios from "axios";
import { postData } from "./api";

// 회원가입 요청
export const signUp = async (data) => {
  const response = postData("/auth/signup", data);
  if (response) {
    // response가 true를 리턴하면 다시 로그인 페이지로
  } else {
    // response가 false라면 회원가입 실패, 다시 회원가입 페이지로
  }
};

// 토큰을 갱신하려면 만료된 토큰을 headers에 보내줘야 함
// tokenRefresh의 정상적인 리턴값은 새 accessToken
export const tokenRefresh = async () => {
  try {
    const response = postData("/token/refresh");
    if (response) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return;
    } else {
      // refresh 토큰도 만료됐으면 다시 로그인
      console.log(response);
      return alert("RESPONSE NOT 200");
    }
  } catch (error) {
    console.error(error);
    return alert("ERROR");
  }
};
