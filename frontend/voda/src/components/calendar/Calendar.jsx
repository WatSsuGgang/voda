import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getMonth } from "../../services/calendar";
import "dayjs/locale/ko";

const now = new Date();
const initialValue = dayjs(now.toString());

function DayBadge(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const emotionsToShow = getRandomNumber(0, 4);
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? emotionBadge(emotionsToShow) : undefined}
      // color="primary"
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar() {
  const nowYear = now.getUTCFullYear();
  const nowMonth = now.getUTCMonth() + 1;
  const nowDate = now.getUTCDate();
  const [isLoading, setIsLoading] = useState(false);
  const [month, setMonth] = useState(nowMonth);
  const [year, setYear] = useState(nowYear);
  const [date, setDate] = useState(nowDate);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const fetchHighlightedDays = async (year, month) => {
    setIsLoading(true);
    const response = await getMonth(month, year);
    setHighlightedDays(response.data);
  };

  useEffect(() => {
    fetchHighlightedDays(year, month);
  }, [year, month]);

  const handleMonthChange = (e) => {
    setMonth(e.month() + 1);
  };

  const handleYearChange = (e) => {
    setYear(e.year());
  };

  const handleDateChange = (e) => {
    setDate(e.date());
  };

  return (
    <>
      <div>
        <h1>
          {year}년 {month}월 {date}일
        </h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DemoContainer
          components={["DateCalendar", "DateCalendar", "DateCalendar"]}
        >
          <DemoItem>
            <DateCalendar
              sx={{
                width: "100%",
                height: "100%",
              }}
              defaultValue={dayjs(initialValue)}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              onChange={handleDateChange}
              views={["year", "month", "day"]}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
