import React from "react";

const Emoticon = ({ aiSpeaking, voiceRecognized }) => {
  const EMOJI_URL = import.meta.env.VITE_EMOJI_URL;
  return aiSpeaking ? (
    <img
      src={`${EMOJI_URL}/People%20with%20activities/Woman%20Tipping%20Hand%20Light%20Skin%20Tone.png`}
      alt="Woman Tipping Hand Light Skin Tone"
      width="300"
      height="300"
    />
  ) : voiceRecognized ? (
    <img
      src={`${EMOJI_URL}/People%20with%20activities/Woman%20Gesturing%20OK%20Light%20Skin%20Tone.png`}
      alt="Woman Gesturing OK Light Skin Tone"
      width="300"
      height="300"
    />
  ) : (
    <img
      src={`${EMOJI_URL}/People%20with%20activities/Woman%20Gesturing%20No%20Light%20Skin%20Tone.png`}
      alt="Woman Gesturing No Light Skin Tone"
      width="300"
      height="300"
    />
  );
};
export default Emoticon;
