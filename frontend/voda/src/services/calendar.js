import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
//
// month와 year 파라미터 안 넘어오면 현재 시간을 기준으로
export const getMonthNow = () => {
  const url = `/calendar`;
  const response = request(HTTPMethods.GET, url);
  return response;
};

// month와 year 파라미터 안 넘어오면 현재 시간을 기준으로
export const getMonth = async (month, year) => {
  const url = `/calendar?month=${month}&year=${year}`;
  const response = await request(HTTPMethods.GET, url);
  return response;
};

// User
//
// Date 는 yymmdd (240305)
export const getDate = async (date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yymmdd = year + month + day;
  const url = `/calendar/${yymmdd}`;
  const response = await request(HTTPMethods.GET, url);
  return response;
};
