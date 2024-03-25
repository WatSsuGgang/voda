import { React, useState } from "react";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/ko";

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const FilteringBox = ({ setStartDate, setEndDate, setEmotion }) => {
  function formatDate(year, month, day) {
    // 년, 월, 일을 문자열로 변환하고, 한 자리 숫자인 경우 앞에 0을 붙입니다.
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    // yyyy-mm-dd 형식으로 조합합니다.
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  }
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [emo, setEmo] = useState("");
  const handleStartDateChange = (event) => {
    const date = formatDate(event.$y, event.$M + 1, event.$D) + "T00:00:00";
    setStart(date);
  };
  const handleEndDateChange = (event) => {
    const date = formatDate(event.$y, event.$M + 1, event.$D) + "T23:59:59";
    setEnd(date);
  };
  const handleEmotionChange = (event) => {
    setEmo(event.target.value);
  };
  const handleButtonClick = () => {
    setStartDate(start);
    setEndDate(end);
    setEmotion(emo);
  };
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          label="시작 날짜"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          format="YYYY/MM/DD"
          onChange={handleStartDateChange}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          label="종료 날짜"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          format="YYYY/MM/DD"
          onChange={handleEndDateChange}
        />
      </LocalizationProvider>
      <FormControl size="small" style={{ minWidth: "20vw" }}>
        <InputLabel id="demo-simple-select-filled-label">감정</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select"
          value={emo}
          label="Emotion"
          onChange={handleEmotionChange}
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          <MenuItem value={"JOY"}>기쁨</MenuItem>
          <MenuItem value={"ANGER"}>분노</MenuItem>
          <MenuItem value={"SADNESS"}>슬픔</MenuItem>
          <MenuItem value={"FEAR"}>무서움</MenuItem>
          <MenuItem value={"CURIOSITY"}>놀람</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleButtonClick}
        style={{
          borderRadius: "10px",
          backgroundColor: "#D9D9D9",
          color: "#000000",
          height: "100%",
        }}
      >
        검색
      </Button>
    </Container>
  );
};

export default FilteringBox;
