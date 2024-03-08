import React from "react"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import styled from "styled-components";
import diaryListIcon from "../../assets/navbar/diaryList.svg";
import calendarIcon from "../../assets/navbar/calendar.svg";
import myPageIcon from "../../assets/navbar/myPage.svg";
import petIcon from "../../assets/navbar/pet.svg";
import voiceDiaryIcon from "../../assets/navbar/voiceDiary.svg";
import { useLocation } from "react-router-dom";

const opacity = {
  diary: 0,
  voice: 0,
  calendar: 0,
  pet: 0,
  mypage: 0,
};

const Nav = styled.nav`
  background-color: #fffae1;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icons = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const NavBar = () => {
  const location = useLocation();
  function opacityStyle(location) {
    let loc = "";
    if (location === "/") {
      loc = "pet";
    } else {
      loc = location.split("/")[1];
    }
    for (const key in opacity) {
      if (key === loc) {
        opacity[key] = 1;
      } else {
        opacity[key] = 0.2;
      }
    }
  }
  opacityStyle(location.pathname);
  return (
    <div>
      <Nav>
        <NavLink to="/">
          <Icons style={{ opacity: opacity.pet }}>
            <div>
              <img src={petIcon} alt="" />
            </div>
            <div>펫 키우기</div>
          </Icons>
        </NavLink>
        <NavLink to="/diary">
          <Icons style={{ opacity: opacity.diary }}>
            <div>
              <img src={diaryListIcon} alt="" />
            </div>
            <div>일기 목록</div>
          </Icons>
        </NavLink>
        <NavLink to="/voice">
          <Icons style={{ opacity: opacity.voice }}>
            <div>
              <img src={voiceDiaryIcon} alt="" />
            </div>
            <div>일기 쓰기</div>
          </Icons>
        </NavLink>
        <NavLink to="/calendar">
          <Icons style={{ opacity: opacity.calendar }}>
            <div>
              <img src={calendarIcon} alt="" />
            </div>
            <div>캘린더</div>
          </Icons>
        </NavLink>
        <NavLink to="/mypage">
          <Icons style={{ opacity: opacity.mypage }}>
            <div>
              <img src={myPageIcon} alt="" />
            </div>
            <div>마이페이지</div>
          </Icons>
        </NavLink>
      </Nav>
    </div>
  );
};
export default NavBar;
