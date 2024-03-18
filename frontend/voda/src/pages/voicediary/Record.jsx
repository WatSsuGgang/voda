import React, { useState, useRef, useEffect } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import Timer from "../../components/voicediary/Timer";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import PlingSound from "../../assets/voicediary/Pling.mp3";

const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  color: #afab99;
`;

const Record = () => {
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [voiceRecognized, setVoiceRecognized] = useState(true);
  const [audioURL, setAudioURL] = useState(null);
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioElementRef = useRef(null);
  const analyserRef = useRef(null);
  const aiAnalyserRef = useRef(null);

  // audio context 초기 설정
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
  }, []);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Connect the media stream to the audio context
          const source =
            audioContextRef.current.createMediaStreamSource(stream);
          source.connect(analyserRef.current);
          // Start recording
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          const chunks = [];
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
          setAiSpeaking(false);
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: "audio/webm" });
            const audioURL = URL.createObjectURL(audioBlob);
            setAudioURL(audioURL);
            setAiSpeaking(true);
          };
          recorderRef.current = mediaRecorder;
          audioElementRef.current.play();
        })
        .catch((error) => {
          console.error("Error accessing user media:", error);
        });
    } else {
      console.error("MediaRecorder is not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (recorderRef.current.state == "recording") {
      recorderRef.current.stop();
      // // 서버로 오디오 파일 전송
      // recorderRef.current.ondataavailable = (e) => {
      //   const audioBlob = new Blob([e.data], { type: "audio/webm" });
      //   const formData = new FormData();
      //   formData.append("audioFile", audioBlob);
      //   fetch("/upload", {
      //     method: "POST",
      //     body: formData,
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       // 서버에서 받은 텍스트를 화면에 표시
      //       console.log("음성 파일 텍스트 변환 결과:", data.text);
      //     })
      //     .catch((error) => {
      //       console.error("음성 파일 변환 오류:", error);
      //     });
      // };
    } else {
      console.log("녹음 중이 아닙니다.");
    }
  };

  const navigate = useNavigate();
  const exit = () => {
    if (window.confirm("모든 내용은 삭제됩니다. 일기를 종료하시겠습니까?")) {
      navigate("/voice");
    }
  };
  const Emoticon = aiSpeaking ? (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Tipping%20Hand%20Light%20Skin%20Tone.png"
      alt="Man Tipping Hand Light Skin Tone"
      width="300"
      height="300"
    />
  ) : voiceRecognized ? (
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
  const Mention = aiSpeaking ? (
    <div>질문을 생성중입니다.</div>
  ) : voiceRecognized ? (
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
      <Button onClick={startRecording}>시작</Button>
      <Button onClick={stopRecording}>종료</Button>
      <audio controls src={audioURL} />
      <audio
        ref={audioElementRef}
        src={PlingSound}
        style={{ display: "none" }}
      />

      {/* <audio
        ref={aiAnalyserRef}
        src={}
        style={{ display: "none" }}
      /> */}
    </div>
  );
};

export default Record;
