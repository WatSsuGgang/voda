import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import IntroductionHeader from "../../components/login/IntroductionHeader";
import LoginButton from "../../components/login/LoginButton";
import { Modal } from "@mui/material";
import vodaLogo from "/logo.svg";

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 10rem;
  border-radius: 2rem;
  background-color: white;
  padding: 0.3rem;
`;
const InstallButton = styled.button`
  width: 70%;
  height: 5vh;
  background-color: #89adaa;
  border-radius: 10px;
  border: 0.5px ridge;
  color: white;
`;
const Introduction = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [seen, setSeen] = useState(false);
  const handleCloseModal = () => setSeen(false);
  const [device, setDevice] = useState("");
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 설치 프롬프트에 동의했습니다.");
        } else {
          console.log("사용자가 설치 프롬프트를 무시했습니다.");
        }

        setDeferredPrompt(null);
        setSeen(false);
      });
    }
  };

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
    setSeen(true);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const agent = navigator.userAgent;
    let tempDevice = "web";

    if (agent.toLowerCase().indexOf("android") >= 0) {
      tempDevice = "android";
    } else if (agent.toLowerCase().indexOf("iphone") >= 0) {
      tempDevice = "iphone";
    }
    setDevice(tempDevice);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  return (
    <>
      <div
        style={{
          width: "85%",
          margin: "auto",
        }}
      >
        <IntroductionHeader />
        <IntroductionCarousel />
        <LoginButton />
      </div>

      <Modal open={seen} onClose={handleCloseModal}>
        <ModalForm>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={vodaLogo}
              style={{ width: "5rem", height: "10vh", marginRight: "5%" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "centers",
              }}
            >
              <h3 style={{ textAlign: "center", paddingBottom: "2%" }}>
                음성 일기 서비스 Voda
              </h3>

              <InstallButton
                style={{ fontWeight: " bold" }}
                onClick={handleInstallClick}
              >
                앱 다운로드
              </InstallButton>
            </div>
          </div>
        </ModalForm>
      </Modal>
    </>
  );
};

export default Introduction;
