// Calendar.js

import React, { useState } from "react";
import "./styles.css"; // styles.css 파일 import
import CalendarDetail from "./CalendarDetail";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 월의 일 수
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 현재 월의 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

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
        <div key={`empty-${i}`} className="calendar-day"></div>
      );
    }
    // 날짜를 추가합니다.
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      calendarDays.push(
        <div
          key={i}
          className="calendar-day"
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
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
