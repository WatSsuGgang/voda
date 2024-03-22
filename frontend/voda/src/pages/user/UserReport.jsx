import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore";
import { getUserReport } from "../../services/mypage";
import LoadingReport from "../../components/user/LoadingReport";
import Analysis from "../../components/user/Analysis";
const UserReport = () => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const response = await getUserReport();
  //       setReport(response);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getUserData();
  // }, []);
  useEffect(() => {
    setReport({
      diary_counts: 3,
      emotion_statics: {
        joy: 66,
        anger: 33,
        sadness: 0,
        fear: 0,
        curiosity: 0,
      },
      weekly_statics: {
        monday: {
          emotion: "ANGER",
          summary:
            "카디건을 걸치고서 계단을 올라 옥상 문을 열었다. 시멘트 바닥과 벽에는 예쁘게 그려놓은 꽃들이 화사하게 피어 있었다.",
        },
      },
      pet_name: "펫 이름",
    });
  }, []);

  setTimeout(() => {
    setLoading(false);
    console.log(loading);
  }, 2000);

  return (
    <div>{loading ? <LoadingReport /> : <Analysis report={report} />}</div>
  );
};

export default UserReport;
