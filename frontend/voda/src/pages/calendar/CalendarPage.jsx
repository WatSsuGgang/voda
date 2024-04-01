import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import Calendar from "../../components/calendar/Calendar";

const CalendarPage = () => {
  return (
    <div>
      <h3
        style={{
          backgroundColor: "#FFFAE1",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        감정 캘린더
      </h3>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
