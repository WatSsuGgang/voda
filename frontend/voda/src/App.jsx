import React from "react"; // eslint-disable-line no-unused-vars
import "./App.css";
import { Route, Routes } from "react-router-dom";
// 로그인된 사용자가 볼 수 있는 페이지
import Pet from "./pages/pet/Pet";
import DiaryList from "./pages/diarylist/DiaryList";
import Calendar from "./pages/calendar/CalendarPage";
import User from "./pages/user/User";
import VoiceDiary from "./pages/voicediary/VoiceDiary";
import Record from "./pages/voicediary/Record";
import CheckChat from "./pages/voicediary/CheckChat";
import NavBar from "./components/common/NavBar";
import DiaryDetail from "./pages/diarylist/DiaryDetail";
// 비로그인 상태에서는 서비스 소개 및 로그인 화면만 볼 수 있음.
import Introduction from "./pages/login/Introduction";
import Login from "./pages/login/Login";
import Nickname from "./pages/login/Nickname";
import useStore from "./store/store";
import LoginSuccess from "./pages/login/LoginSuccess";

// const isLogin = false;
import styled from "styled-components";
const isLogin = true;

const Wrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const { isLoggedIn } = useStore();
  if (accessToken) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Pet />}></Route>
          <Route path="/diary" element={<DiaryList />}></Route>
          <Route path="/diary/:id" element={<DiaryDetail />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/voice" element={<VoiceDiary />}></Route>
          <Route path="/voice/record" element={<Record />}></Route>
          <Route path="/voice/check" element={<CheckChat />}></Route>
        </Routes>
        <Wrapper>
          <NavBar />
        </Wrapper>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Introduction />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/nickname" element={<Nickname />}></Route>
        <Route path="/login-success" element={<LoginSuccess />}></Route>
      </Routes>
    );
  }
}

export default App;
