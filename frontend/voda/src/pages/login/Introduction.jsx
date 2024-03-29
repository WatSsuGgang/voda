import React from "react"; // eslint-disable-line no-unused-vars
import IntroductionCarousel from "../../components/login/IntroductionCarousel";
import IntroductionHeader from "../../components/login/IntroductionHeader";
import LoginButton from "../../components/login/LoginButton";

const Introduction = () => {
  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", async () => {
  //     try {
  //       const registration = await navigator.serviceWorker.register("/sw.js");
  //       console.log(
  //         "ServiceWorker registration successful with scope: ",
  //         registration.scope
  //       );
  //     } catch (err) {
  //       console.error("ServiceWorker registration failed: ", err);
  //     }
  //   });
  // }

  // window.addEventListener("load", () => {
  //   if (
  //     navigator.serviceWorker &&
  //     window.matchMedia("(display-mode: standalone)").matches
  //   ) {
  //     navigator.serviceWorker.getRegistration().then((reg) => {
  //       reg.update();
  //     });
  //   }
  // });
  return (
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
  );
};

export default Introduction;
