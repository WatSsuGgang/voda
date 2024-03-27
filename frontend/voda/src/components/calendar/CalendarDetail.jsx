// DiaryModal.js

import React, { useState, useEffect } from "react";
import { getDate } from "../../services/calendar";

const CalendarDetail = ({ selectedDate, closeModal }) => {
  // 선택된 날짜에 대한 상세 정보를 받아와서 보여주는 부분
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    // 선택된 날짜에 대한 일기 데이터를 받아옴
    const fetchDiaries = async () => {
      try {
        const response = await getDate(selectedDate);
        setDiaries(response.data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchDiaries();
  }, [selectedDate]); // selectedDate가 변경될 때마다 호출

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{selectedDate}의 일기</h2>
        {/* 일기 데이터를 표시하는 부분 */}
        <ul>
          {diaries.map((diary, index) => (
            <li key={index}>{diary}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarDetail;
