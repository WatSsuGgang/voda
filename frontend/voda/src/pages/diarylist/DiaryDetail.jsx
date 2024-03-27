import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import useStore from "../../store/store";
import styled from "styled-components";
import save from "../../assets/diarylist/save.svg";
import playbutton from "../../assets/diarylist/playbutton.svg";
import { getDiaryDetail } from "../../services/diarylist";
import LodaingSpinner from "../../components/common/LoadingSpinner";

const Title = styled.h3`
  color: #486b73;
`;

const Container = styled.div`
  background-color: #f1f1f1;
  min-width: 90vw;
  min-height: 30vh;
  margin: 0 10px;
  border-radius: 15px;
  max-height: 62vh;
  overflow: auto;
`;

const DiaryDetail = () => {
  const [diary, setDiary] = useState(null); // 초기값을 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [audioFiles, setAudioFiles] = useState([]);
  const { id } = useParams();

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
  }, []); // id가 변경될 때마다 다이어리를 다시 가져옴

  const store = useStore();
  const emotionImageUrl = store.emotions[diary?.diaryEmotion];
  const audioContextRef = useRef(null);

  const playVoice = (e) => {
    e.preventDefault();
    console.log("클릭함", e);
    if (audioFiles.length > 0) {
      const playNextAudio = (currentIndex) => {
        if (currentIndex < audioFiles.length - 1) {
          const nextAudio = new Audio(audioFiles[currentIndex + 1]?.fileUrl);
          nextAudio.onended = () => {
            playNextAudio(currentIndex + 1);
          };
          nextAudio.play();
        }
      };

      const firstAudio = new Audio(audioFiles[0]?.fileUrl);
      firstAudio.onended = () => {
        playNextAudio(0);
      };
      firstAudio.play();
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
        <Title>
          {diary.writerName}님의 {parseInt(diary.createdAt.slice(5, 7))}/
          {parseInt(diary.createdAt.slice(8, 10))}
          일기
        </Title>
        <img
          src={emotionImageUrl}
          style={{ marginLeft: "1rem", height: "5vh", width: "10vw" }}
        />
      </div>
      <Container>
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
            style={{ width: "80%", height: "50%", borderRadius: "10%" }}
          />
        </div>
        {/* 일기 내용 */}
        <div style={{ padding: "2rem" }}>{diary.diaryContent}</div>
      </Container>
      {/* 녹음 파일 재생 버튼 */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <img src={playbutton} onClick={playVoice} />
      </div>

      <audio
        ref={audioContextRef}
        onEnded={() =>
          setCurrentAudioIndex(
            (prevIndex) => (prevIndex + 1) % audioFiles.length
          )
        }
        style={{ display: "none" }}
      ></audio>
    </div>
  );
};

export default DiaryDetail;
