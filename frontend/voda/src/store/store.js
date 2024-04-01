import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 디버깅 용도

const store = (set, get) => ({
  emotions: {
    ANGER: "Smilies/Enraged%20Face.png",
    JOY: "Smilies/Grinning%20Face%20with%20Smiling%20Eyes.png",
    SADNESS: "Smilies/Loudly%20Crying%20Face.png",
    FEAR: "Smilies/Fearful%20Face.png",
    CURIOSITY: "Smilies/Nerd%20Face.png",
  },
  editAllow: false,
  changeEditMode: () => {
    set((state) => ({ editAllow: !state.editAllow }));
  },
  diaryId: "",
  setDiaryId: (value) => {
    set({ diaryId: value });
  },
});

const useStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useStore;
