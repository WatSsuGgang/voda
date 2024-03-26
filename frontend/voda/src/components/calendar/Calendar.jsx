import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko";
import styled from "styled-components";

const StyledCalendarWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar__navigation {
    background: #cad6c0;
    border-bottom: 4px solid #486b73;
    height: 90px;
    border-radius: 20px 20px 0 0;

    span {
      font-size: 24px;
      font-weight: 600;
      color: #98b3a4;
    }
  }
  .react-calendar__navigation button:disabled {
    background-color: #98b3a4;
    border-radius: 20px 20px 0 0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #486b73;
    border-radius: 20px 20px 0 0;
  }
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__month-view {
    padding: 12px 32px;
    abbr {
      // 텍스트
      color: black;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .react-calendar__month-view__weekdays {
    abbr {
      // 텍스트 부분
      font-size: 18px;
      font-weight: 900;
    }
  }
  .react-calendar__tile {
    text-align: center;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #486b73;
    border-radius: 14px;
  }
  .react-calendar__tile--now {
    background: #486b73;
    border-radius: 14px;
  }
  /*hover, focus 시 */
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #486b73;
    border-radius: 14px;
  }
`;

export default function ReactCalendar() {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
  const activeDate = moment(value).format("YYYY-MM-DD"); // 클릭한 날짜 (년-월-일))
  // 일기 작성 날짜 리스트
  const dayList = [
    "2023-03-10",
    "2023-03-21",
    "2023-04-02",
    "2023-04-14",
    "2023-04-27",
  ];
  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contents.push(
        <>
          <div className="dot"></div>
          {/* <Image
            src="emotion/good.svg"
            className="diaryImg"
            width="26"
            height="26"
            alt="today is..."
          /> */}
        </>
      );
    }
    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  const monthOfActiveDate = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const getActiveMonth = (activeStartDate) => {
    const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
    setActiveMonth(newActiveMonth);
  };
  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        locale="en"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
        tileContent={addContent}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
      />
    </StyledCalendarWrapper>
  );
}
