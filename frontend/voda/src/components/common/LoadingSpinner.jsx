import React from "react";
import ClipLoader from "react-spinners/ClipLoader"; //설치한 cliploader을 import한다

const LodaingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ClipLoader />
    </div>
  );
};

export default LodaingSpinner;
