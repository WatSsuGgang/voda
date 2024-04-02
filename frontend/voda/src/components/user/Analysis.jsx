import React from "react";
import AnalysisDaily from "./AnalysisDaily";
import AnalysisEmotion from "./AnalysisEmotion";
import AnalysisPet from "./AnalysisPet";
import AnalysisCount from "./AnalysisCount";
import NotFound from "./NotFound";
import { SectionsContainer, Section } from "react-fullpage";

const Analysis = ({ report }) => {
  let options = {
    activeClass: "active", // the class that is appended to the sections links
    anchors: ["sectionOne", "sectionTwo", "sectionThree", "sectionFour"], // the anchors for each sections
    arrowNavigation: true, // use arrow keys
    className: "SectionContainer", // the class name for the section container
    delay: 1000, // the scroll animation speed
    navigation: false, // use dots navigatio
    scrollBar: false, // use the browser default scrollbar
    sectionClassName: "Section", // the section class name
    sectionPaddingTop: "0", // the section top padding
    sectionPaddingBottom: "0", // the section bottom padding
    verticalAlign: false, // align the content of each section vertical
  };
  return (
    <div>
      {report.diaryCount === 0 ? (
        <NotFound />
      ) : (
        <SectionsContainer {...options}>
          <Section>
            <AnalysisCount report={report} />
          </Section>
          <Section>
            <AnalysisEmotion report={report} />
          </Section>
          <Section>
            <AnalysisDaily report={report} />
          </Section>
          <Section>
            <AnalysisPet />
          </Section>
        </SectionsContainer>
      )}
    </div>
  );
};

export default Analysis;
