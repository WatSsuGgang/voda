import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
// 로그인된 사용자가 볼 수 있는 페이지
import PetPage from "./pages/pet/PetPage";
import PetShopPage from "./pages/pet/PetShopPage";
import DiaryList from "./pages/diarylist/DiaryList";
import CalendarPage from "./pages/calendar/CalendarPage";
import User from "./pages/user/User";
import VoiceDiary from "./pages/voicediary/VoiceDiary";
import Record from "./pages/voicediary/Record";
import CheckChat from "./pages/voicediary/CheckChat";
import NavBar from "./components/common/NavBar";
import DiaryDetail from "./pages/diarylist/DiaryDetail";
import UserReport from "./pages/user/UserReport";
// 비로그인 상태에서는 서비스 소개 및 로그인 화면만 볼 수 있음.
import Introduction from "./pages/login/Introduction";
import Login from "./pages/login/Login";
import Nickname from "./pages/login/Nickname";
import LoginSuccess from "./pages/login/LoginSuccess";
import styled from "styled-components";

const Wrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("accessToken") !== null);
  }, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/pet" element={<PetPage />}></Route>
          <Route path="/pet/shop" element={<PetShopPage />}></Route>
          <Route path="/diary" element={<DiaryList />}></Route>
          <Route path="/diary/:id" element={<DiaryDetail />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/user/report" element={<UserReport />}></Route>
          <Route path="/voice" element={<VoiceDiary />}></Route>
          <Route path="/voice/record" element={<Record />}></Route>
          <Route path="/voice/check/:id" element={<CheckChat />}></Route>
          <Route path="/login-success/" element={<LoginSuccess />}></Route>
        </Routes>
        <Wrapper>
          <NavBar />
        </Wrapper>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/intro" element={<Introduction />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login/nickname" element={<Nickname />}></Route>
          <Route path="/login-success" element={<LoginSuccess />}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
