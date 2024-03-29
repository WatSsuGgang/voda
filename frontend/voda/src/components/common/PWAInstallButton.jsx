import React, { useEffect, useState } from "react";
import { RiInstallLine } from "react-icons/ri";
import styled from "styled-components";
const InstallButton = styled.button`
  width: 100%;
  height: 5vh;
  background-color: #feffd4;
  border-radius: 10px;
  border: 0.5px ridge;
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
        <div>
          <InstallButton onClick={handleInstallClick}>
            <RiInstallLine style={{ width: "5vw", height: "3vh" }} />
          </InstallButton>
          <div>앱 설치를 원하시면 버튼을 클릭해주세요</div>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
