import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 펫 정보 (홈 화면)
export const getPet = () => {
  const url = "/pet";
  const response = request(HTTPMethods.GET, url);
};

// User
// 펫 대화
export const getPetTalk = (petId) => {
  const url = `/pet/talk/${petId}`;
  const response = request(HTTPMethods.GET, url);
};

// User
// 펫 먹이주기
export const feedPet = (petId) => {
  const url = `/pet/feed/${petId}`;
  const response = request(HTTPMethods.PATCH, url);
};

// User
// 펫 레벨업
export const levelUpPet = (petId) => {
  const url = `/pet/levelup/${petId}`;
  const response = request(HTTPMethods.PATCH, url);
};

// User
// 펫 닉네임 수정
export const editPetName = (petId, name) => {
  const url = `/pet/${petId}`;
  const data = { name };
  const response = request(HTTPMethods.PATCH, url, data);
};

// Admin
// 펫 대화 추가하기
// data = { talk, status }
export const postPetTalk = (data) => {
  const url = `/pet/talk`;
  const response = request(HTTPMethods.POST, url, data);
};
