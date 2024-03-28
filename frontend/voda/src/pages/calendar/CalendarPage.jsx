import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import Calendar from "../../components/calendar/Calendar";

const CalendarPage = () => {
  return (
    <div
      style={{
        marginTop: "3rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        감정 캘린더
      </h2>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
