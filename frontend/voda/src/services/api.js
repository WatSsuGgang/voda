import axios from "axios";
import { tokenRefresh } from "./auth";

// HTTPMethods
export const HTTPMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// HTTPStatusCodes
export const HTTPStatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// axios 기본값 설정
// baseURL 설정
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// headers 설정
const ACCESS_TOKEN = localStorage.getItem("accessToken");
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = ACCESS_TOKEN;

// GET 요청의 경우 일반적으로 data를 안보내니까 그 부분 분기를 하던가 줄 아래처럼 분리하는 것도 고려. 일단은 data 기본값을 빈 객체로 설정해둠
// axios 요청
export const request = async (method, url, data = {}) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    const status = response.status;
    if (
      status === HTTPStatusCodes.OK ||
      status === HTTPStatusCodes.CREATED ||
      status === HTTPStatusCodes.ACCEPTED ||
      status === HTTPStatusCodes.NO_CONTENT
    ) {
      // 응답코드가 200일 경우 로직
      // console.log(response);
      return response;
    } else {
      // 응답코드가 200이 아닐 경우 로직
      // 토큰 만료됐을 경우 리프레시
      // 일단 200 아니면 토큰 리프레시
      const newAccessToken = tokenRefresh();
    }
    console.log(response);
  } catch (error) {
    // 에러 로직
    console.error(error);
  }
};

// ------------------------------------------------------------------------------------------------

// get 요청
export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return response;
    } else {
      // 아닐 경우
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};

// post 요청
export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return response;
    } else {
      // 아닐 경우
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};

// formdata 전송
export const formPostData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // 'multipart/form-data' 헤더를 설정합니다.
        Authorization: ACCESS_TOKEN, // 기존의 Authorization 헤더를 유지합니다.
      },
    });
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return response;
    } else {
      // 아닐 경우
      console.log("현재상태: ", status);
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};

// delete 요청
export const deleteData = async (url) => {
  try {
    const response = await axios.delete(url);
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return true;
    } else {
      // 아닐 경우
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};
// put 요청
export const putData = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return true;
    } else {
      // 아닐 경우
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};

// patch 요청
export const patchData = async () => {
  try {
    const response = await axios.delete(url);
    const status = response.status;
    if (status === HTTPStatusCodes.OK) {
      // 응답 200일 경우
      return true;
    } else {
      // 아닐 경우
      return false;
    }
  } catch (error) {
    // 에러일 경우
    console.error(error);
    return false;
  }
};
