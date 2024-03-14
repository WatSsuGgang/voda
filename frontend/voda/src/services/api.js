import axios from "axios";

// axios 인스턴스 생성
export const api = axios.create({ baseURL: "" });

export const httpRequest = async (method, url, data, config) => {
  try {
    const response = await axios[method](url, data, config);
    return response;
  } catch (error) {
    return error;
  }
};

// get 요청
export const getRequest = async (url, config) => {
  try {
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    return error;
  }
};

// post 요청
export const postRequest = async (url, data, config) => {
  try {
    const response = await axios.post(url, data, config);
    return response;
  } catch (error) {
    return error;
  }
};

// delete 요청
export const deleteRequest = async (url, config) => {
  try {
    const response = await axios.delete(url, config);
    return response;
  } catch (error) {
    return error;
  }
};

// put 요청
export const putRequest = async (url, data, config) => {
  try {
    const response = await axios.put(url, data, config);
    return response;
  } catch (error) {
    return error;
  }
};

// patch 요청
export const patchRequest = async () => {
  try {
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      return response.data;
    } else {
      // 만료된 토큰이면
      console.log(response);
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
