import React from "react";
import styled from "styled-components";
import AnalysisDaily from "./AnalysisDaily";
import AnalysisEmotion from "./AnalysisEmotion";
import AnalysisPet from "./AnalysisPet";
import AnalysisCount from "./AnalysisCount";
const Analysis = ({ report }) => {
  return (
    <div>
      {/* <AnalysisCount report={report} /> */}
      {/* <AnalysisEmotion report={report} /> */}
      {/* <AnalysisDaily report={report} /> */}
      <AnalysisPet report={report} />
    </div>
  );
};

export default Analysis;
