import React from "react";
const Mention = ({ aiSpeaking, voiceRecognized }) => {
  return aiSpeaking ? (
    <div>질문을 생성중입니다.</div>
  ) : voiceRecognized ? (
    <div>잘 듣고 있어요. 계속 말씀하세요</div>
  ) : (
    <div>
      음성을 인식하지 못했어요. <br />
      다시 말씀해주세요
    </div>
  );
};

export default Mention;
