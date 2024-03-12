import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import Timer from "../../components/voicediary/Timer";
import { useNavigate } from "react-router-dom";
const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  color: #afab99;
`;

const Record = () => {
  const [voiceRecognized] = useState(true);
  const navigate = useNavigate();
  const exit = () => {
    if (window.confirm("모든 내용은 삭제됩니다. 일기를 종료하시겠습니까?")) {
      navigate("/voice");
    }
  };
  const Emoticon = voiceRecognized ? (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20OK%20Light%20Skin%20Tone.png"
      alt="Man Gesturing OK Light Skin Tone"
      width="300"
      height="300"
    />
  ) : (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20No%20Light%20Skin%20Tone.png"
      alt="Man Gesturing No Light Skin Tone"
      width="300"
      height="300"
    />
  );
  const Mention = voiceRecognized ? (
    <div>잘 듣고 있어요. 계속 말씀하세요</div>
  ) : (
    <div>
      음성을 인식하지 못했어요. <br />
      다시 말씀해주세요
    </div>
  );
  return (
    <div>
      <div style={{ marginTop: "15%", display: "flex", justifyContent: "end" }}>
        <LogoutIcon onClick={exit} />
      </div>
      <Title>AI와 대화하며 일기를 작성해요</Title>
      <div style={{ textAlign: "center" }}>{Emoticon}</div>
      <Timer />
      <div
        style={{ textAlign: "center", marginTop: "15%", fontSize: "1.2rem" }}
      >
        {Mention}
      </div>
    </div>
  );
};

export default Record;

// NO -> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20No%20Light%20Skin%20Tone.png" alt="Man Gesturing No Light Skin Tone" width="300" height="300" />
// OK -> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20OK%20Light%20Skin%20Tone.png" alt="Man Gesturing OK Light Skin Tone" width="300" height="300" />
