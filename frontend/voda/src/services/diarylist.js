import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 일기 상세 정보
export const getDiaryDetail = async (diaryId) => {
  const url = `/diary/detail/${diaryId}`;
  const response = await request(HTTPMethods.GET, url);
  return response;
};

// User
// 일기 리스트
// 없는 파라미터들은 빈 문자열 ""
export const getDiaryList = async (start, end, emotion) => {
  const url = `/diary/list?start=${start}&end=${end}&emotion=${emotion}`;
  const response = await request(HTTPMethods.GET, url);
  return response;
};
