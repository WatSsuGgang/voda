import React from "react";
import styled from "styled-components";
import diaryListIcon from "/images/navbar/diaryList.svg";
import calendarIcon from "/images/navbar/calendar.svg";
import userIcon from "/images/navbar/user.svg";
import petIcon from "/images/navbar/pet.svg";
import voiceDiaryIcon from "/images/navbar/voiceDiary.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteDiary } from "../../services/voicediary";
import { usePersistStore, useStore } from "../../store/store";
import Swal from "sweetalert2";
const opacity = {
  diary: 0,
  voice: 0,
  calendar: 0,
  pet: 0,
  user: 0,
};

const Nav = styled.nav`
  // background-color: #fffae1;6C8F8C
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-radius: 20px 20px 0 0;
`;

const Icons = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Menus = styled.div`
  font-size: 12px;
`;

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  const { darkmode } = usePersistStore();
  const handleLinkClick = async (destination) => {
    const currentPath = location.pathname;
    if (
      (currentPath === "/voice/record") |
      currentPath.includes("/voice/check/")
    ) {
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
          // 다이어리 삭제
          await deleteDiary(store.diaryId);
          // 목적지로 이동
          navigate(destination);
        }
      });
    } else {
      navigate(destination);
    }
  };

  const opacityStyle = (location) => {
    let loc = location.split("/")[1];
    for (const key in opacity) {
      opacity[key] = key === loc ? 1 : 0.2;
    }
  };

  opacityStyle(location.pathname);

  return (
    <div>
      <Nav
        style={
          darkmode
            ? { backgroundColor: "#6C8F8C" }
            : { backgroundColor: "#fffae1" }
        }
      >
        <div onClick={() => handleLinkClick("/pet")}>
          <Icons style={{ opacity: opacity.pet }}>
            <div>
              <img
                src={petIcon}
                style={darkmode ? { filter: "invert(100%)" } : {}}
              />
            </div>
            <Menus>펫 키우기</Menus>
          </Icons>
        </div>
        <div onClick={() => handleLinkClick("/diary")}>
          <Icons style={{ opacity: opacity.diary }}>
            <div>
              <img
                src={diaryListIcon}
                style={darkmode ? { filter: "invert(100%)" } : {}}
              />
            </div>
            <Menus>일기 목록</Menus>
          </Icons>
        </div>
        <div onClick={() => handleLinkClick("/voice")}>
          <Icons style={{ opacity: opacity.voice }}>
            <div>
              <img
                src={voiceDiaryIcon}
                style={darkmode ? { filter: "invert(100%)" } : {}}
              />
            </div>
            <Menus>일기 쓰기</Menus>
          </Icons>
        </div>
        <div onClick={() => handleLinkClick("/calendar")}>
          <Icons style={{ opacity: opacity.calendar }}>
            <div>
              <img
                src={calendarIcon}
                style={darkmode ? { filter: "invert(100%)" } : {}}
              />
            </div>
            <Menus>캘린더</Menus>
          </Icons>
        </div>
        <div onClick={() => handleLinkClick("/user")}>
          <Icons style={{ opacity: opacity.user }}>
            <div>
              <img
                src={userIcon}
                style={darkmode ? { filter: "invert(100%)" } : {}}
              />
            </div>
            <Menus>마이페이지</Menus>
          </Icons>
        </div>
      </Nav>
    </div>
  );
};
export default NavBar;
