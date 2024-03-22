import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// Admin
// 아이템 생성
export const createItem = (data) => {
  const url = `/item`;
  const response = request(HTTPMethods.POST, url, data);
};

// Admin
// 아이템 수정
export const editItem = (data) => {
  const url = `/item`;
  const response = request(HTTPMethods.PATCH, url, data);
};

// Admin
// 아이템 삭제
export const deleteItem = () => {
  const url = `/item`;
  const response = request(HTTPMethods.DELETE, url);
};

// User
// 아이템 구매
export const buyItem = async (data) => {
  const url = `/item/buy`;
  const response = await request(HTTPMethods.POST, url, data);
};

// All
// 상점 아이템 조회
export const getItem = (category) => {
  const url = `/item?category=${category}`;
  const response = request(HTTPMethods.GET, url);
  return response;
};
