import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 디버깅 용도

const store = (set, get) => ({
  emotions: {
    anger:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Enraged%20Face.png",
    joy: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Smiling%20Eyes.png",
    sad: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Loudly%20Crying%20Face.png",
    fear: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Fearful%20Face.png",
    curiosity:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png",
  },
  editAllow: true,
  changeEditMode: () => {
    set((state) => ({ editAllow: !state.editAllow }));
  },
});

const useStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useStore;
