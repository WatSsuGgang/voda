import React from "react"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import styled from "styled-components";
import diaryListIcon from "../../assets/navbar/diaryList.svg";
import calendarIcon from "../../assets/navbar/calendar.svg";
import userIcon from "../../assets/navbar/user.svg";
import petIcon from "../../assets/navbar/pet.svg";
import voiceDiaryIcon from "../../assets/navbar/voiceDiary.svg";
import { useLocation } from "react-router-dom";

const opacity = {
  diary: 0,
  voice: 0,
  calendar: 0,
  pet: 0,
  user: 0,
};

const Nav = styled.nav`
  background-color: #fffae1;
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
            <Menus>펫 키우기</Menus>
          </Icons>
        </NavLink>
        <NavLink to="/diary">
          <Icons style={{ opacity: opacity.diary }}>
            <div>
              <img src={diaryListIcon} alt="" />
            </div>
            <Menus>일기 목록</Menus>
          </Icons>
        </NavLink>
        <NavLink to="/voice">
          <Icons style={{ opacity: opacity.voice }}>
            <div>
              <img src={voiceDiaryIcon} alt="" />
            </div>
            <Menus>일기 쓰기</Menus>
          </Icons>
        </NavLink>
        <NavLink to="/calendar">
          <Icons style={{ opacity: opacity.calendar }}>
            <div>
              <img src={calendarIcon} alt="" />
            </div>
            <Menus>캘린더</Menus>
          </Icons>
        </NavLink>
        <NavLink to="/user">
          <Icons style={{ opacity: opacity.user }}>
            <div>
              <img src={userIcon} alt="" />
            </div>
            <Menus>마이페이지</Menus>
          </Icons>
        </NavLink>
      </Nav>
    </div>
  );
};
export default NavBar;
