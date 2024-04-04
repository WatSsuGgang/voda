import React from "react";
import ClipLoader from "react-spinners/ClipLoader"; //설치한 cliploader을 import한다
import { usePersistStore } from "../../store/store";

const LoadingSpinner = () => {
  const store = usePersistStore();
  return (
    <div
      style={
        store.darkmode
          ? {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "invert(100%)",
            }
          : {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }
      }
    >
      <ClipLoader />
    </div>
  );
};

export default LoadingSpinner;
