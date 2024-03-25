import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import Calendar from "../../components/calendar/Calendar";
import { getMonth } from "../../services/calendar";

const CalendarPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonth();
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>감정 캘린더</h2>
      <Calendar />
    </>
  );
};

export default CalendarPage;
