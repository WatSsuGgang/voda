import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 내 정보 조회
export const getUserInfo = () => {
  const url = "/user";
  const response = request(HTTPMethods.GET, url);
};

// User
// 유저 정보 수정 (닉네임)
// data = { new_nickname }
export const editUserInfo = (data) => {
  const url = "/user";
  const response = request(HTTPMethods.PATCH, url, data);
};

// User
// 회원 탈퇴
export const deleteUser = () => {
  const url = "/user";
  const response = request(HTTPMethods.DELETE, url);
};

// User
// 감정 통계 확인
export const getUserReport = () => {
  const url = "/user/report";
  const response = request(HTTPMethods.GET, url);
};
