import React, { useEffect, useState } from "react";
import { RiInstallLine } from "react-icons/ri";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const InstallButton = styled.button`
  width: 30%;
  height: 5vh;
  background-color: #feffd4;
  border-radius: 10px;
  border: 0.5px ridge;
  animation: ${blink} 5s ease-in-out;
`;

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

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
      });
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "0 3%", fontWeight: "bold" }}>앱 다운로드</div>
          <InstallButton onClick={handleInstallClick}>
            <RiInstallLine style={{ width: "10vw", height: "3vh" }} />
          </InstallButton>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
