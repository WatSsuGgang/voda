import React from "react";

const Emoticon = ({ aiSpeaking, voiceRecognized }) => {
  return aiSpeaking ? (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Tipping%20Hand%20Light%20Skin%20Tone.png"
      alt="Man Tipping Hand Light Skin Tone"
      width="300"
      height="300"
    />
  ) : voiceRecognized ? (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20OK%20Light%20Skin%20Tone.png"
      alt="Man Gesturing OK Light Skin Tone"
      width="300"
      height="300"
    />
  ) : (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Gesturing%20No%20Light%20Skin%20Tone.png"
      alt="Man Gesturing No Light Skin Tone"
      width="300"
      height="300"
    />
  );
};
export default Emoticon;
