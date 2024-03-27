import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../../store/userStore";
import { getUserReport } from "../../services/mypage";
import LoadingReport from "../../components/user/LoadingReport";
import Analysis from "../../components/user/Analysis";
import NotFound from "../../components/user/NotFound";
const UserReport = () => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserReport();
        setReport(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div>{loading ? <LoadingReport /> : <Analysis report={report.data} />}</div>
  );
};

export default UserReport;
