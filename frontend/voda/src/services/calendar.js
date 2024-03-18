import { request } from "./api";
import { HTTPMethods } from "./api";
import { HTTPStatusCodes } from "./api";

// User
//
// month와 year 파라미터 안 넘어오면 현재 시간을 기준으로
export const getMonth = (month, year) => {
  const url = `/calendar?month=${month}&year=${year}`;
  const response = request(HTTPMethods.GET, url);
};

// User
//
// Date 는 yymmdd (240305)
export const getDate = (date) => {
  const url = `/calendar?${date}`;
  const response = request(HTTPMethods.GET, url);
};
