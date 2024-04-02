import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Timer from "../../components/voicediary/Timer";
import { useNavigate } from "react-router-dom";
import PlingSound from "/Pling.mp3";
import Emoticon from "../../components/voicediary/Emoticon";
import Swal from "sweetalert2";
import {
  initDiary,
  recordDiary,
  createDiary,
  getTalkList,
  deleteDiary,
} from "../../services/voicediary"; // api 함수 불러오기
import { useStore, usePersistStore } from "../../store/store";
const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  color: #afab99;
`;

const Record = () => {
  const { darkmode } = usePersistStore();
  const navigate = useNavigate();
  const store = useStore();
  const [aiSpeaking, setAiSpeaking] = useState(true); // ai가 말하는 중인지 구분
  const [voiceRecognized, setVoiceRecognized] = useState(true); // 음성 인식이 30데시벨 이상으로잘 되고 있는지 구분
  const [aiAudioURL, setAiAudioURL] = useState(null); // aiAudioUrl, 서버에 요청을 보내서 응답이 올 때 설정
  const [getResponse, setGetResponse] = useState(false); // 서버에서 응답을 받아올 때마다 변경
  const aiAudioElementRef = useRef(null); // ai의 음성 데이터를 연결시키는 audio tag ref
  const effectAudioElementRef = useRef(null); // 녹음 시작 시 효과음 audio tag ref
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestIdRef = useRef(null);
  const [speakingTime, setSpeakingTime] = useState(60);
  let chatCount = 0;
  // 처음 화면을 렌더링 할 때, init api 요청 받아옴
  useEffect(() => {
    // 일기에 대한 Id값 저장, 첫 질문 오디오 파일 받아오기
    const fetchAudioUrl = async () => {
      try {
        const res = await initDiary();
        console.log("최초 응답:", res.data);
        if (res.data.terminate) {
          Swal.fire({
            title: "일기 횟수 제한",
            html: `
            일기는 하루에 3회까지만 작성할 수 있습니다.
            `,
            showCancelButton: false,
            confirmButtonText: "확인",
          });
          navigate("/diarylist");
        } else {
          setAiAudioURL(res.data.ttsUrl);
          store.setDiaryId(res.data.diaryId);
        }
        setGetResponse(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAudioUrl();
  }, []);

  // 음성 데시벨을 측정해서, 20 데시벨 이하로 6초 이상 유지되면 음성 녹음 종료
  const consecutiveSilenceTimeRef = useRef(null);
  const monitorDecibelLevel = () => {
    // 분석기에서 시간 도메인 데이터를 가져옴
    const dataArray = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(dataArray);

    // 진폭 데이터를 이용하여 데시벨 수준 계산
    let totalAmplitude = 0;
    for (let i = 0; i < dataArray.length; i++) {
      // 진폭 데이터는 0에서 255까지의 값이므로 이를 -1에서 1 범위로 정규화
      const amplitude = (dataArray[i] - 128) / 128;
      totalAmplitude += Math.abs(amplitude);
    }
    const averageAmplitude = totalAmplitude / dataArray.length;

    // 정규화된 진폭 데이터를 바탕으로 데시벨 수준 계산
    const decibelLevel = 20 * Math.log10(averageAmplitude);

    console.log("데시벨:", decibelLevel);

    // 데시벨이 임계값 이하인지 확인
    if (decibelLevel <= -20) {
      // 예시로 임계값을 -20으로 설정
      consecutiveSilenceTimeRef.current += 100; // 0.1초마다 측정
      if (consecutiveSilenceTimeRef.current >= 3000) {
        // 6초 이상
        setVoiceRecognized(false); // 음성 인식이 2초 이상으로 잘 되고 있는지 구분
      }
      if (consecutiveSilenceTimeRef.current >= 5000) {
        // 4초 이상
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
    if (getResponse === true) {
      // AI의 음성 출력이 끝나면 다시 사용자가 얘기할 수 있도록 로직 구현

      const handleAudioEnded = () => {
        startRecording();
      };
      // AI의 음성 데이터를 가져오고, 0.1초 있다가 실행
      const timeout = setTimeout(() => {
        aiAudioElementRef.current.play();
      }, 100);
      aiAudioElementRef.current.addEventListener("ended", handleAudioEnded);
      return () => {
        clearTimeout(timeout);
        aiAudioElementRef?.current?.removeEventListener(
          "ended",
          handleAudioEnded
        );
      };
    }
  }, [getResponse]);

  // 대화 내용 받아오는 함수
  const fetchTalkList = async (diaryId) => {
    try {
      const res = await getTalkList(diaryId);
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
      navigate("/pet");
      Swal.fire({
        position: top,
        icon: "success",
        title: "일기 생성",
        html: `
        생성이 완료되면 알려드릴게요.
        `,
        showConfirmButton: false,
        timer: 2000,
      });

      const talkRes = await fetchTalkList(diaryId);
      const res = await createDiary(diaryId, talkRes.data.talk_list);
      console.log("일기 생성:", res);
    } catch (err) {
      console.error(err);
    }
  };
  // 강제 종료
  const terminateRecord = () => {
    if (!aiSpeaking) {
      stopRecording();
      if (store.editAllow) {
        navigate(`/voice/check/${store.diaryId}`);
      } else {
        fetchCreate(store.diaryId);
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "질문 중에는 종료할 수 없습니다",
      });
    }
  };

  // 사용자 녹음이 종료되면 서버에 음성 파일 보내는 함수
  const fetchRecord = async (data) => {
    try {
      chatCount += 1;
      const res = await recordDiary(data);
      console.log("응답옴:", res.data);
      setGetResponse(true);
      // 만약 terminate가 true이면 일기를 종료해야 된다.
      if (res.data.terminate) {
        // 10회 이상으로 terminate가 된 경우
        if (chatCount === 10) {
          Swal.fire({
            title: "대화 횟수 초과",
            html: `
            일기 생성이 완료되면 알려드릴게요.
            `,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        // 대화 내용 편집 허용이면 대화 수정 페이지로 렌더링 시켜야 한다.
        if (store.editAllow) {
          navigate(`/voice/check/${store.diaryId}`);
        } else if (!store.editAllow) {
          // 편집 허용이 아니라면 바로 일기 생성하는 함수 실행
          fetchCreate(store.diaryId);
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
    setGetResponse(false);
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.minDecibels = -90;
    analyserRef.current.maxDecibels = -10;
    analyserRef.current.smoothingTimeConstant = 0.85;
    analyserRef.current.fftsize = 512;
    // getUserMedia 연결
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const supportedConstraints =
        navigator.mediaDevices.getSupportedConstraints();
      const constraints = { audio: true };
      if (supportedConstraints.noiseSuppression) {
        constraints.audio = { ...constraints.audio, noiseSuppression: true };
      }
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
          // 캔버스 그리기 위한 세팅
          const canvasCtx = canvasRef.current.getContext("2d");
          const containerWidth =
            canvasRef.current.clientWidth.toString() || "0";
          canvasRef.current?.setAttribute("width", containerWidth);

          // 오디오 시각화
          const visualizeAudio = () => {
            const width = canvasRef.current.width || 0;
            const height = canvasRef.current.height || 0;

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);

            canvasCtx.clearRect(0, 0, width, height);

            const draw = () => {
              if (!canvasCtx) {
                return;
              }
              requestIdRef.current = requestAnimationFrame(draw);
              analyserRef.current.getFloatFrequencyData(dataArray);
              // console.log("데시벨", dataArray);
              canvasCtx.fillStyle = darkmode ? "#212426" : "rgb(255, 255, 255)";
              canvasCtx.fillRect(0, 0, width, height);

              // 주파수 데이터가 부족한 경우 캔버스가 비어 보이지 않도록 barWidth를 크게 표현하기위해 2.5를 곱해줍니다.
              const barWidth = (width / bufferLength) * 2.5;
              let barHeight = 0;
              let x = 0; // 캔버스 왼쪽 끝에서부터 시작

              // dataArray 주파수 데이터를 순회하며 캔버스에 그려줍니다.
              for (let i = 0; i < bufferLength; i++) {
                // 막대기 높이 계산
                barHeight = (dataArray[i] + 120) * 2;
                // 막대기가 높을 수록 밝은 색으로 표시됩니다.
                canvasCtx.fillStyle =
                  "rgb(" + Math.floor(barHeight + 100) + ",50,50)";

                canvasCtx.fillRect(
                  x,
                  height - barHeight / 2, // 막대기가 사각형 밑변 중간에 걸칠 수 있게 y좌표 offset 조정
                  barWidth,
                  barHeight
                );

                x += barWidth + 1;
              }
            };
            draw();
          };
          visualizeAudio();

          mediaRecorder.onstop = () => {
            // // 서버로 오디오 파일 전송
            const audioBlob = new Blob(chunks, { type: "audio/mpeg" });
            const formData = new FormData();
            formData.append("diaryId", store.diaryId);
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
    if (recorderRef.current?.state == "recording") {
      setAiSpeaking(true);
      recorderRef.current.stop();
    } else {
      console.log("녹음 중이 아닙니다.");
    }
  };
  if (speakingTime <= 1) {
    stopRecording();
  }
  const exit = async () => {
    Swal.fire({
      title: "일기 작성을 종료하시겠습니까?",
      text: "지금까지의 기록은 모두 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // 현재 오디오 스트림을 가져옴
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          // 오디오 스트림이 존재하면 연결된 트랙을 중지
          if (mediaStream) {
            const tracks = mediaStream.getTracks();
            console.log("미디어 스트림", mediaStream);
            console.log("track", tracks);
            tracks.forEach((track) => track.stop());
          }
        }
        stopRecording();
        await deleteDiary(store.diaryId);
        navigate("/voice");
      }
    });
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
        <Timer aiSpeaking={aiSpeaking} setSpeakingTime={setSpeakingTime} />
        <StopCircleIcon
          onClick={terminateRecord}
          style={{ marginLeft: "3%" }}
        />
      </div>

      {/* 데시벨 시각화 */}
      {!aiSpeaking && (
        <div
          ref={containerRef}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <canvas ref={canvasRef} height={120}></canvas>
        </div>
      )}

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
