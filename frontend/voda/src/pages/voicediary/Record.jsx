import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Timer from "../../components/voicediary/Timer";
import { useNavigate } from "react-router-dom";
import PlingSound from "../../assets/voicediary/Pling.mp3";
import Emoticon from "../../components/voicediary/Emoticon";
import Mention from "../../components/voicediary/Mention";
import {
  initDiary,
  recordDiary,
  createDiary,
  getTalkList,
} from "../../services/voicediary"; // api 함수 불러오기
import useStore from "../../store/store";
const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  color: #afab99;
`;

const Record = () => {
  const navigate = useNavigate();
  const store = useStore();
  const [aiSpeaking, setAiSpeaking] = useState(true); // ai가 말하는 중인지 구분
  const [voiceRecognized, setVoiceRecognized] = useState(true); // 음성 인식이 30데시벨 이상으로잘 되고 있는지 구분
  const [audioURL, setAudioURL] = useState(null); // 사용자의 음성 녹음이 종료될 때 생성되는 audioUrl
  const [aiAudioURL, setAiAudioURL] = useState(null); // aiAudioUrl, 서버에 요청을 보내서 응답이 올 때 설정
  const aiAudioElementRef = useRef(null); // ai의 음성 데이터를 연결시키는 audio tag ref
  const effectAudioElementRef = useRef(null); // 녹음 시작 시 효과음 audio tag ref
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const [Id, setId] = useState("");

  // 처음 화면을 렌더링 할 때, ai 질문 음성 파일을 임시로 설정해줌. 추후, init api 요청으로 바꿀 예정
  useEffect(() => {
    // api init api 요청. 일기에 대한 Id값 저장, 첫 질문 오디오 파일 받아오기
    const fetchAudioUrl = async () => {
      try {
        const res = await initDiary();
        console.log("최초 응답:", res.data);
        setAiAudioURL(res.data.ttsUrl);
        setId(res.data.diaryId);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAudioUrl();
  }, []);

  // 음성 데시벨을 측정해서, 20 데시벨 이하로 6초 이상 유지되면 음성 녹음 종료
  const consecutiveSilenceTimeRef = useRef(null);
  const monitorDecibelLevel = () => {
    // 분석기에서 데시벨 수준 가져오기
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);

    // 데시벨 수준 계산
    let totalDecibel = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const amplitude = dataArray[i] - 128;
      totalDecibel += Math.abs(amplitude);
    }
    const averageDecibel = totalDecibel / dataArray.length;
    console.log("데시벨:", averageDecibel);
    // 데시벨이 임계값 이하인지 확인
    if (averageDecibel <= 100) {
      consecutiveSilenceTimeRef.current += 100; // 0.1초마다 측정
      if (consecutiveSilenceTimeRef.current >= 2000) {
        setVoiceRecognized(false); // 음성 인식이 20 데시벨 이상으로 잘 되고 있는지 구분. 이모티콘 변경
      }
      if (consecutiveSilenceTimeRef.current >= 6000) {
        // 일정 시간 동안 데시벨이 임계값 이하로 유지되었을 때 녹음 중지
        stopRecording();
      }
    } else {
      consecutiveSilenceTimeRef.current = 0;
      setVoiceRecognized(true);
    }
  };

  // 내가 말할 차례가 오면 음성 데시벨 인식 시작
  useEffect(() => {
    if (aiSpeaking === false) {
      consecutiveSilenceTimeRef.current = 0; // 초기화
      const intervalId = setInterval(monitorDecibelLevel, 100);
      return () => clearInterval(intervalId); // cleanup 함수에서 clearInterval 호출
    }
  }, [aiSpeaking]);

  // aiAudioUrl 값이 변경될 때마다 실행
  useEffect(() => {
    // AI의 음성 출력이 끝나면 다시 사용자가 얘기할 수 있도록 로직 구현
    const handleAudioEnded = () => {
      startRecording();
    };
    // AI의 음성 데이터를 가져오고, 0.5초 있다가 실행
    const timeout = setTimeout(() => {
      aiAudioElementRef.current.play();
    }, 500);
    aiAudioElementRef.current.addEventListener("ended", handleAudioEnded);
    return () => {
      clearTimeout(timeout);
    };
  }, [aiAudioURL]);

  // 대화 내용 받아오는 함수
  const fetchTalkList = async (id) => {
    try {
      const res = await getTalkList(id);
      console.log("지금까지의 대화:", res);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  // 일기 생성 요청 보내는 함수
  const fetchCreate = async (diaryId) => {
    try {
      stopRecording();
      window.alert("일기를 생성 중입니다. 생성이 완료되면 알려드릴게요");
      navigate("/pet");
      const talkRes = await fetchTalkList(diaryId);
      const res = await createDiary(diaryId, talkRes.data);
      console.log("일기 생성:", res);
    } catch (err) {
      console.error(err);
    }
  };
  // 사용자 녹음이 종료되면 서버에 음성 파일 보내는 함수
  const fetchRecord = async (data) => {
    try {
      const res = await recordDiary(data);
      console.log("응답옴:", res.data);
      // 만약 terminate가 true이면 일기를 종료해야 된다.
      if (res.data.terminate) {
        // 대화 내용 편집 허용이면 대화 수정 페이지로 렌더링 시켜야 한다.
        if (store.editAllow) {
          navigate(`/voice/check/${Id}`);
        } else {
          // 편집 허용이 아니라면 바로 일기 생성하는 함수 실행
          fetchCreate(Id);
        }
      } else {
        setAiAudioURL(res.data.ttsUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const startRecording = () => {
    // 이모티콘 변경
    setAiSpeaking(false);
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    // getUserMedia 연결
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
          recorderRef.current = mediaRecorder;
          // 녹음이 시작되면 효과음 재생
          effectAudioElementRef.current.play();

          const chunks = [];
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            // // 서버로 오디오 파일 전송
            const audioBlob = new Blob(chunks, { type: "audio/mpeg" });
            const formData = new FormData();
            formData.append("diaryId", Id);
            formData.append("file", audioBlob, "recording.mpeg");
            fetchRecord(formData);
          };
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
      setAiSpeaking(true);
      recorderRef.current.stop();
    } else {
      console.log("녹음 중이 아닙니다.");
    }
  };

  const exit = () => {
    if (window.confirm("모든 내용은 삭제됩니다. 일기를 종료하시겠습니까?")) {
      navigate("/voice");
    }
  };

  return (
    <div>
      <div style={{ marginTop: "15%", display: "flex", justifyContent: "end" }}>
        <LogoutIcon onClick={exit} />
      </div>
      <Title>AI와 대화하며 일기를 작성해요</Title>
      <div style={{ textAlign: "center" }}>
        <Emoticon aiSpeaking={aiSpeaking} voiceRecognized={voiceRecognized} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Timer />
        <StopCircleIcon
          onClick={() => fetchCreate(Id)}
          style={{ marginLeft: "3%" }}
        />
      </div>
      <div
        style={{ textAlign: "center", marginTop: "15%", fontSize: "1.2rem" }}
      >
        <Mention aiSpeaking={aiSpeaking} voiceRecognized={voiceRecognized} />
      </div>

      {/* 사용자의 음성 녹음 시작을 알리는 효과음 재생 */}
      <audio
        ref={effectAudioElementRef}
        src={PlingSound}
        style={{ display: "none" }}
      />

      {/* AI의 질문 음성 파일 재생 */}
      <audio
        ref={aiAudioElementRef}
        src={aiAudioURL}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Record;
