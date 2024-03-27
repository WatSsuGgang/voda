import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 펫 정보 (홈 화면)
// 임시 memberId
export const getPet = async () => {
  const url = `/pet`;
  const response = await request(HTTPMethods.GET, url);
  return response.data;
};

// User
// 펫 대화
export const getPetTalk = () => {
  const url = `/pet/talk/`;
  const response = request(HTTPMethods.GET, url);
  return response.data;
};

// User
// 펫 먹이주기
export const feedPet = async () => {
  const url = `/pet/feed/`;
  const response = await request(HTTPMethods.PATCH, url);
  return response.data;
};

// User
// 펫 레벨업
export const levelUpPet = () => {
  const url = `/pet/levelup/`;
  const response = request(HTTPMethods.PATCH, url);
};

// User
// 펫 닉네임 수정
export const editPetName = async (name) => {
  const url = `/pet`;
  const data = { name };
  const response = await request(HTTPMethods.PATCH, url, data);
};

// Admin
// 펫 대화 추가하기
// data = { talk, status }
export const postPetTalk = (data) => {
  const url = `/pet/talk`;
  const response = request(HTTPMethods.POST, url, data);
};
