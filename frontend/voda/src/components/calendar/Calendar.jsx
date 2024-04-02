import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import { Modal } from "@mui/material"; // Material-UI에서 Modal import
import LoadingSpinner from "../common/LoadingSpinner";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDate, getMonth } from "../../services/calendar";
import { useStore } from "../../store/store";
import "./styles.css"; // styles.css 파일 import

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 날짜로 초기화
  const [showDetail, setShowDetail] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [diaryDates, setDiaryDates] = useState([]); // 백엔드 API에서 받아온 일기가 있는 날짜들을 저장
  const [diaryDatesMap, setDiaryDatesMap] = useState({});
  const [diaryData, setDiaryData] = useState(null); // 일기 데이터 상태 추가
  const [isDiaryDataLoading, setIsDiaryDataLoading] = useState(false);
  const { emotions } = useStore();
  const navigate = useNavigate();

  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;

  // Ref를 사용하여 터치 이벤트 처리를 위한 DOM 요소 참조
  const swipeRef = useRef(null);
  // 터치 이벤트 처리를 위한 변수 선언
  let touchStartX = 0;
  let touchEndX = 0;

  // useEffect를 사용하여 스와이프 동작 감지 함수를 등록
  useEffect(() => {
    const handleSwipeStart = (e) => {
      // 터치 이벤트가 발생한 위치 저장
      touchStartX = e.touches[0].clientX;
    };

    const handleSwipeEnd = (e) => {
      // 터치 이벤트가 종료된 위치 저장
      touchEndX = e.changedTouches[0].clientX;

      // 스와이프 거리 계산
      const swipeDistance = touchEndX - touchStartX;

      // 오른쪽으로 스와이프하면 이전 달로 변경
      if (swipeDistance > 50) {
        handlePrevMonth();
      }
      // 왼쪽으로 스와이프하면 다음 달로 변경
      else if (swipeDistance < -50) {
        handleNextMonth();
      }
    };

    // Swipe 이벤트 리스너 등록
    const swipeElement = swipeRef.current;
    swipeElement.addEventListener("touchstart", handleSwipeStart);
    swipeElement.addEventListener("touchend", handleSwipeEnd);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      swipeElement.removeEventListener("touchstart", handleSwipeStart);
      swipeElement.removeEventListener("touchend", handleSwipeEnd);
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    // 백엔드 API에서 해당 월의 일기가 있는 날짜들과 감정을 받아옴
    const fetchDiaryDates = async () => {
      try {
        setDiaryDates([]);
        setDiaryDatesMap({});
        const response = await getMonth(currentMonth + 1, currentYear);
        if (response && response.data.calendar) {
          response.data.calendar.map((item) => {
            setDiaryDates((diaryDates) => [...diaryDates, item.day]);
            setDiaryDatesMap((diaryDatesMap) => ({
              ...diaryDatesMap,
              [item.day]: item.dailyEmotion,
            }));
          });
        }
      } catch (error) {
        console.error("Error fetching diary dates:", error);
      }
    };

    fetchDiaryDates();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // 일기 데이터를 가져오는 비동기 함수
    setIsDiaryDataLoading(true);
    const fetchDiaryData = async () => {
      try {
        // 여기서는 selectedDate에 해당하는 일기 데이터를 받아옴.
        const response = await getDate(selectedDate);
        setDiaryData(response.data.diaries); // 받아온 데이터를 상태에 설정
        setIsDiaryDataLoading(false);
      } catch (error) {
        console.error("Error fetching diary data:", error);
      }
    };

    fetchDiaryData();
  }, [selectedDate]); // selectedDate가 변경될 때마다 useEffect가 실행됨

  // 각 날짜에 대해 해당하는 감정 이미지를 반환하는 함수
  const getEmotionImage = (day) => {
    // diaryData에는 백엔드 API에서 받아온 해당 날짜의 일기 데이터가 있습니다.
    // 해당 날짜의 일기 데이터가 있다면, 해당 날짜의 감정 이미지를 반환합니다.
    // 일기 데이터가 없거나 해당 날짜의 일기 데이터에 감정 정보가 없다면, null을 반환합니다.
    return emotions[diaryDatesMap[day]];
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 월의 일 수
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 현재 월의 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay(); // 현재 월의 마지막 날의 요일

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (date) => {
    const day = date.getDate();
    const hasDiary = Array.isArray(diaryDates) && diaryDates.includes(day);
    // 해당 날짜에 일기가 있는 경우에만 모달을 열도록 설정
    if (hasDiary) {
      setSelectedDate(date);
      setCurrentMonth(date.getMonth());
      setShowDetail(true);
    }
  };

  const handleDiaryItemClick = (diaryId) => {
    // 다이어리 아이템을 클릭하면 해당 다이어리의 페이지로 이동
    navigate(`/diary/${diaryId}`);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // 현재 월이 1월일 경우 12월로 변경
      setCurrentYear((prevYear) => prevYear - 1); // 연도도 변경
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1); // 그 외의 경우에는 이전 달로 변경
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // 현재 월이 12월일 경우 1월로 변경
      setCurrentYear((nextYear) => nextYear + 1); // 연도도 변경
    } else {
      setCurrentMonth((nextMonth) => nextMonth + 1); // 그 외의 경우에는 다음 달로 변경
    }
  };

  const renderCalendar = () => {
    const calendarDays = [];
    // 첫 주의 빈 칸을 채웁니다.
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDays = new Date(
        currentYear,
        currentMonth,
        -firstDayOfMonth + 1 + i
      ).getDate();
      const date = new Date(currentYear, currentMonth - 1, prevMonthDays);
      calendarDays.push(
        <div
          key={`empty-start-${i}`}
          className={`calendar-day non-current-month`}
          onClick={() => handleDateClick(date)} // 해당 칸의 날짜를 클릭할 수 있도록 함
        >
          {date.getDate()}
        </div>
      );
    }
    // 날짜를 추가합니다.
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentMonth = date.getMonth() === currentMonth; // 현재 달인지 확인
      const isSelected = date.toDateString() === selectedDate.toDateString(); // 선택된 날짜인지 확인
      const day = date.getDate();
      const hasDiary = Array.isArray(diaryDates) && diaryDates.includes(day);
      // 해당 날짜에 일기가 있는지 확인
      calendarDays.push(
        <div
          key={i}
          className={`calendar-day ${
            isCurrentMonth ? "current-month" : "non-current-month"
          }`}
          onClick={() => isCurrentMonth && handleDateClick(date)}
        >
          {/* 각 날짜에 대한 감정 이미지를 표시합니다. */}
          {hasDiary && (
            <img
              src={`${EMOJI_URL}/${getEmotionImage(day)}`}
              alt="emotion"
              className="diary-emotion"
            />
          )}
          {/* 일기가 있는 날짜에는 'has-diary' 클래스 추가 */}
          <p
            className={`${isSelected ? "selected" : ""} ${
              hasDiary ? "has-diary" : ""
            }`}
          >
            {i}
          </p>
        </div>
      );
    }
    // 말일 이후의 빈 칸을 채웁니다.
    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
      const date = new Date(currentYear, currentMonth + 1, i + 1);
      calendarDays.push(
        <div
          key={`empty-end-${i}`}
          className={`calendar-day non-current-month`}
          onClick={() => handleDateClick(date)} // 해당 칸의 날짜를 클릭할 수 있도록 함
        >
          {date.getDate()}
        </div>
      );
    }
    return <div className="calendar">{calendarDays}</div>;
  };
  return (
    <div className="calendar-wrapper" ref={swipeRef}>
      {/* Swipe를 적용할 DOM에 Ref 추가 */}
      <div className="calendar-header">
        <NavigateBeforeSharpIcon
          className="button"
          onClick={handlePrevMonth}
        ></NavigateBeforeSharpIcon>
        {/* <button onClick={handlePrevMonth}>&lt;</button> */}
        <h2>
          {currentYear}. {currentMonth + 1}
        </h2>
        <NavigateNextSharpIcon
          className="button"
          onClick={handleNextMonth}
        ></NavigateNextSharpIcon>
        {/* <button onClick={handleNextMonth}>&gt;</button> */}
      </div>
      <div className="weekdays">
        {weekdays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      {showDetail && (
        <Modal open={showDetail} onClose={() => setShowDetail(false)}>
          <div className="modal">
            <div className="modal-date">
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
            </div>

            {/* 일기 데이터를 표시하는 부분 */}
            {isDiaryDataLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <div className="diary-items">
                {diaryData.length > 0 ? (
                  diaryData.map((item, index) => (
                    <div
                      key={index}
                      className="diary-item"
                      onClick={() => handleDiaryItemClick(item.diaryId)} // 다이어리 아이템 클릭 시 해당 다이어리 페이지로 이동
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="diary-item-image"
                      />
                      <div className="diary-item-title">{item.title}</div>
                      <img
                        src={`${EMOJI_URL}/${emotions[item.emotion]}`}
                        alt=""
                        className="diary-item-emotion"
                      />
                    </div>
                  ))
                ) : (
                  <h4>작성한 일기가 없습니다.</h4>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
