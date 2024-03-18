import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
// 일기 작성
export const startRecording = () => {
  const url = "/diary/init";
  const response = request(HTTPMethods.GET, url);
};

// User
// 사용자 답변 전송, ai 응답 수신
// stt로 텍스트 변환 -> AI가 다음 질문 생성 -> 프론트에서 tts 실행
// "오늘 일기 끝" 등의 종료 조건 수신 시 일기 작성 종료
// data = { user_response }
export const recordDiary = (data) => {
  const url = "/diary/answer";
  const response = request(HTTPMethods.POST, url, data);
};

// User
// 일기 생성
// data = { talk_list: [{q, a}, ...] }
export const createDiary = (data) => {
  const url = "/diary/create";
  const response = request(HTTPMethods.POST, url, data);
};
