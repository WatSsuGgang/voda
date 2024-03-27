// Calendar.js

import React, { useState, useEffect } from "react";
import "./styles.css"; // styles.css 파일 import
import CalendarDetail from "./CalendarDetail";
import { getMonth } from "../../services/calendar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString()); // 현재 날짜로 초기화
  const [showDetail, setShowDetail] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [diaryDates, setDiaryDates] = useState([]); // 백엔드 API에서 받아온 일기가 있는 날짜들을 저장

  useEffect(() => {
    // 백엔드 API에서 해당 월의 일기가 있는 날짜들을 받아옴
    const fetchDiaryDates = async () => {
      try {
        const response = await getMonth(currentMonth, currentYear);
        setDiaryDates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching diary dates:", error);
      }
    };

    fetchDiaryDates();
  }, [currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 월의 일 수
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 현재 월의 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay(); // 현재 월의 마지막 날의 요일

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setShowDetail(true);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((nextMonth) => nextMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear((nextYear) => nextYear + 1);
    }
  };

  const renderCalendar = () => {
    const calendarDays = [];
    // 첫 주의 빈 칸을 채웁니다.
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-start-${i}`} className="calendar-day"></div>
      );
    }
    // 날짜를 추가합니다.
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentMonth = date.getMonth() === currentMonth; // 현재 달인지 확인
      const isSelected = date.toDateString() === selectedDate; // 선택된 날짜인지 확인

      calendarDays.push(
        <div
          key={i}
          className={`calendar-day ${
            isCurrentMonth ? "current-month" : "non-current-month"
          } ${isSelected ? "selected" : ""}`} // 현재 달이 아닌 경우에는 'non-current-month' 클래스 추가
          onClick={() => isCurrentMonth && handleDateClick(date)} // 현재 달이 아닌 날짜는 클릭 불가능하도록 설정
        >
          {i}
        </div>
      );
    }
    // 말일 이후의 빈 칸을 채웁니다.
    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-end-${i}`} className="calendar-day"></div>
      );
    }
    return <div className="calendar">{calendarDays}</div>;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentYear}년 {currentMonth + 1}월
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        {weekdays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      {showDetail && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowDetail(false);
          }}
        ></div>
      )}
      {renderCalendar()}
      {showDetail && (
        <CalendarDetail
          selectedDate={selectedDate}
          closeModal={() => setShowDetail(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
