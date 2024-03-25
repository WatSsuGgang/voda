import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// 회원가입 요청
export const signUp = (data) => {
  const url = "/auth/signup";
  const response = request(HTTPMethods.POST, url, data);
  if (response) {
    // response가 true를 리턴하면 다시 로그인 페이지로
  } else {
    // response가 false라면 회원가입 실패, 다시 회원가입 페이지로
  }
};

// 토큰을 갱신하려면 만료된 토큰을 headers에 보내줘야 함
// tokenRefresh의 정상적인 리턴값은 새 accessToken
export const tokenRefresh = () => {
  try {
    const url = "/token/refresh";
    const response = request(HTTPMethods.POST, url);
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

// 로그아웃 요청 함수
export const logout = () => {
  const url = "token/logout";
  const response = request(HTTPMethods.DELETE, url);
};
