import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 펫 정보 (홈 화면)
// 임시 memberId
export const getPet = async (id) => {
  const url = `/pet/${id}`;
  const response = await request(HTTPMethods.GET, url);
  return response.data;
};

// User
// 펫 대화
export const getPetTalk = (petId) => {
  const url = `/pet/talk/${petId}`;
  const response = request(HTTPMethods.GET, url);
};

// User
// 펫 먹이주기
export const feedPet = async (petId) => {
  const url = `/pet/feed/${petId}`;
  const response = await request(HTTPMethods.PATCH, url);
  return response.data;
};

// User
// 펫 레벨업
export const levelUpPet = (petId) => {
  const url = `/pet/levelup/${petId}`;
  const response = request(HTTPMethods.PATCH, url);
};

// User
// 펫 닉네임 수정
export const editPetName = async (petId, name) => {
  const url = `/pet/${petId}`;
  const data = { name };
  const response = await request(HTTPMethods.PATCH, url, data);
  return response.data;
};

// Admin
// 펫 대화 추가하기
// data = { talk, status }
export const postPetTalk = (data) => {
  const url = `/pet/talk`;
  const response = request(HTTPMethods.POST, url, data);
};
