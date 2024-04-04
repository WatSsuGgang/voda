import { formPostData, request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";
import Swal from "sweetalert2";

// User
// 일기 작성
export const initDiary = () => {
  const url = "/diary/init";
  const response = request(HTTPMethods.GET, url);
  return response;
};

// User
// 사용자 답변 전송, ai 응답 수신
// stt로 텍스트 변환 -> AI가 다음 질문 생성 -> 프론트에서 tts 실행
// "오늘 일기 끝" 등의 종료 조건 수신 시 일기 작성 종료
// data = { user_response }
export const recordDiary = async (data) => {
  const url = "/diary/answer";
  const response = await formPostData(url, data);
  return response;
};

// User
// 일기 생성
// data = { talk_list: [{q, a}, ...] }
export const createDiary = async (id, data) => {
  const transformedData = [];
  let currentItem = {};
  data.forEach((item) => {
    if (item.question) {
      if (Object.keys(currentItem).length !== 0) {
        transformedData.push(currentItem);
        currentItem = {};
      }
      currentItem.question = item.question;
    } else if (item.answer) {
      currentItem.answer = item.answer;
    }
  });

  // 마지막 아이템 처리
  if (Object.keys(currentItem).length !== 0) {
    transformedData.push(currentItem);
  }
  const diaryData = { diaryId: id, talk_list: transformedData };
  const url = "/diary/create";
  const response = await request(HTTPMethods.POST, url, diaryData);

  Swal.fire({
    title: "생성 완료",
    text: "일기가 작성되었습니다.",
    showCancelButton: false,
    confirmButtonText: "확인",
    footer: '<a href="/diary">일기 확인하러 가기</a>',
  });
  return response;
};

// User
// 대화 내용 확인
// data = {"talk_list": [{"question": "질문1"},{"answer": "질문1에 대한 답변"},{"question": "질문2"},{"answer": "질문2에 대한 답변"},...]}
export const getTalkList = async (id) => {
  const url = `/diary/talk/${id}`;
  const response = await request(HTTPMethods.GET, url);
  return response;
};

export const deleteDiary = async (id) => {
  const url = `/diary/terminate`;
  const response = await request(HTTPMethods.POST, url, { diaryId: id });
};
