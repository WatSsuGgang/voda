import axios from "axios";
import { postRequest } from "./api";

// 회원가입 요청
export const signUp = async (data, config) => {
  const response = postRequest("/auth/signup", data, config);

  // try {
  //   const response = await axios.post("/auth/signup", data, config);
  //   if (response.status === 200) {
  //     window.alert("회원가입 성공");
  //   } else {
  //     console.log(response);
  //     return alert("RESPONSE NOT 200");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return alert("ERROR");
  // }
};

// 토큰을 갱신하려면 만료된 토큰을 headers에 보내줘야 함
// tokenRefresh의 정상적인 리턴값은 새 accessToken
export const tokenRefresh = async (config, func) => {
  try {
    const response = await axios.post("/token/refresh", {}, config);
    if (response.status === 200) {
      const newAccessToken = response.data.accessToken;
      return newAccessToken;
    } else {
      console.log(response);
      return alert("RESPONSE NOT 200");
    }
  } catch (error) {
    console.error(error);
    return alert("ERROR");
  }
};
