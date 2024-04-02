import React from "react";
import ClipLoader from "react-spinners/ClipLoader"; //설치한 cliploader을 import한다

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClipLoader />
    </div>
  );
};

export default LoadingSpinner;
