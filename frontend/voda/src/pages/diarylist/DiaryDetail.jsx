import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useStore, usePersistStore } from "../../store/store";
import styled from "styled-components";
import save from "/images/diarylist/save.svg";
import playbutton from "/images/diarylist/playbutton.svg";
import { getDiaryDetail } from "../../services/diarylist";
import LodaingSpinner from "../../components/common/LoadingSpinner";

const Container = styled.div`
  min-width: 90vw;
  min-height: 30vh;
  margin: 0 10px;
  border-radius: 15px;
  max-height: 70vh;
  overflow: auto;
`;

const DiaryDetail = () => {
  const [diary, setDiary] = useState(null); // 초기값을 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [audioFiles, setAudioFiles] = useState([]);
  const { id } = useParams();
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await getDiaryDetail(id);
        setDiary(res.data);
        setLoading(false); // 다이어리를 가져오면 로딩 상태를 false로 변경
        const audioUrl = res.data.diaryFiles.filter((file) => {
          return file.fileType === "MP3";
        });
        setAudioFiles(audioUrl);
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    fetchDiary();
    // 컴포넌트가 언마운트될 때 재생 중인 오디오를 멈춤
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.stop();
      }
    };
  }, [id]); // id가 변경될 때마다 다이어리를 다시 가져옴

  const store = useStore();
  const { darkmode } = usePersistStore();
  const emotionImageUrl = store.emotions[diary?.diaryEmotion];
  const audioContextRef = useRef(null);
  const playNextAudio = () => {
    if (currentAudioIndex < audioFiles.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
      audioContextRef.current.src = audioFiles[currentAudioIndex + 1]?.fileUrl;
      audioContextRef.current.play();
    }
  };

  const playVoice = (e) => {
    e.preventDefault();
    if (audioFiles.length > 0) {
      audioContextRef.current.src = audioFiles[currentAudioIndex]?.fileUrl;
      audioContextRef.current.play();
    }
  };

  const handleDownloadClick = (url) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.download = `${diary.date}.png`;
        aTag.click();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (loading) {
    return <LodaingSpinner />; // 로딩 중일 때 로딩 표시
  }

  if (!diary) {
    return <div>Diary not found.</div>; // 다이어리가 없는 경우 메시지 표시
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>
          {diary.writerName}님의 {parseInt(diary.createdAt.slice(5, 7))}/
          {parseInt(diary.createdAt.slice(8, 10))}
          일기
        </h3>
        <img
          src={`${EMOJI_URL}/${emotionImageUrl}`}
          style={{ marginLeft: "1rem", height: "5vh", width: "10vw" }}
        />
      </div>
      <Container
        style={
          darkmode
            ? { backgroundColor: "#545454" }
            : { backgroundColor: "#f1f1f1" }
        }
      >
        <div
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {diary.diaryTitle}
        </div>
        {/* 상단 바 -> 사진 저장, 날짜, 게시글 삭제 버튼 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 0.8rem",
          }}
        >
          <div>
            <img
              src={save}
              onClick={() =>
                handleDownloadClick(
                  diary.diaryFiles.find((file) => file.fileType === "WEBP")
                    ?.fileUrl
                )
              }
              style={darkmode ? { filter: "invert(100%)" } : {}}
            />
          </div>
          <div>{diary.createdAt.slice(0, 10)}</div>
        </div>
        {/* 일기 이미지 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={
              diary.diaryFiles.find((file) => file.fileType === "WEBP")?.fileUrl
            }
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: "80%",
              height: "50%",
              borderRadius: "10%",
              WebkitTouchCallout: "none",
            }}
          />
        </div>
        {/* 일기 내용 */}
        <div style={{ padding: "2rem" }}>{diary.diaryContent}</div>
      </Container>
      {/* 녹음 파일 재생 버튼 */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
      >
        <img src={playbutton} onClick={playVoice} />
      </div>

      <audio
        ref={audioContextRef}
        style={{ display: "none" }}
        onEnded={playNextAudio}
      ></audio>
    </div>
  );
};

export default DiaryDetail;
