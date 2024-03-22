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

// 소셜 로그인 요청 함수
export const getSocialLoginUrl = (socialType) => {
  const secret = {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirectUri: "https://j10a104.p.ssafy.io/login-success",
    },
    kakao: {
      clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
      redirectUri: "https://j10a104.p.ssafy.io/login-success",
    },
    naver: {
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      redirectUri: "https://j10a104.p.ssafy.io/login-success",
    },
  };
  const base_uri = import.meta.env.VITE_API_URL;
  const url = {
    // google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${secret[socialType].clientId}&scope=openid%20profile%20email&redirect_uri=${secret[socialType].redirectUri}`,
    // kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${secret[socialType].clientId}&redirect_uri=${secret[socialType].redirectUri}&response_type=code`,
    // naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${secret[socialType].clientId}&response_type=code&redirect_uri=${secret[socialType].redirectUri}&state=test`,
    google: `${base_uri}/oauth2/authorization/google?redirect_uri=${secret[socialType].redirectUri}`,
    // kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${secret[socialType].clientId}&redirect_uri=${secret[socialType].redirectUri}&response_type=code`,
    // naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${secret[socialType].clientId}&response_type=code&redirect_uri=${secret[socialType].redirectUri}&state=test`,
  };

  return url[socialType];
  // request(HTTPMethods.GET, url[socialType]);
};
