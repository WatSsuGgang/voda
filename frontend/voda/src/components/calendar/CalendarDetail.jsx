// DiaryModal.js

import React from "react";

const CalendarDetail = ({ selectedDate, closeModal }) => {
  // 선택된 날짜에 대한 상세 정보를 받아와서 보여주는 부분
  // 이 부분도 당신의 프로젝트에 맞게 수정해주세요.
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{selectedDate}의 일기</h2>
        {/* 여기에 선택된 날짜에 대한 일기 내용을 표시하세요 */}
      </div>
    </div>
  );
};

export default CalendarDetail;
