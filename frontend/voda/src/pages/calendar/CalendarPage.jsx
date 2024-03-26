import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import Calendar from "../../components/calendar/Calendar";

const CalendarPage = () => {
  return (
    <div>
      <h2
        style={{
          margin: "0 auto",
        }}
      >
        감정 캘린더
      </h2>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
