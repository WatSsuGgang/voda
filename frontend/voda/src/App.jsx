// import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// 로그인된 사용자가 볼 수 있는 페이지
import Pet from "./pages/pet/Pet";
import DiaryList from "./pages/diarylist/DiaryList";
import Calendar from "./pages/calendar/Calendar";
import MypPage from "./pages/mypage/MyPage";
import VoiceDiary from "./pages/voicediary/VoiceDiary";
import Record from "./pages/voicediary/Record";
import CheckChat from "./pages/voicediary/CheckChat";
import NavBar from "./components/common/NavBar";
// 비로그인 상태에서는 서비스 소개 및 로그인 화면만 볼 수 있음.
import Introduction from "./pages/login/Introduction";
import Login from "./pages/login/Login";
import Nickname from "./pages/login/Nickname";
import useStore from "./store/store";

// const isLogin = false;

function App() {
  const { isLoggedIn } = useStore();
  if (isLoggedIn) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Pet />}></Route>
          <Route path="/diary" element={<DiaryList />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/mypage" element={<MypPage />}></Route>
          <Route path="/voicediary" element={<VoiceDiary />}></Route>
          <Route path="/record" element={<Record />}></Route>
          <Route path="/checkchat" element={<CheckChat />}></Route>
        </Routes>
        <NavBar />
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Introduction />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/nickname" element={<Nickname />}></Route>
      </Routes>
    );
  }
}

export default App;
