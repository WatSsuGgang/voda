import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware"; // 디버깅 용도

export const useStore = create((set, get) => ({
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
}));

export const usePersistStore = create(
  persist(
    (set, get) => ({
      darkmode: false,
      setDarkmode: () => {
        set((state) => ({ darkmode: !state.darkmode }));
      },
    }),
    {
      name: "darkmode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
