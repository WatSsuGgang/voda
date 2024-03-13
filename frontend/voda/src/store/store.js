import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 디버깅 용도

const store = (set, get) => ({
  editAllow: true,
  isLoggedIn: true,
  nickname: "갓소민",
  login: () => set({ isLoggedIn: true, nickname: "갓소민" }),
  logout: () => set({ isLoggedIn: false, nickname: null }),
  changeEditMode: () => {
    set((state) => ({ editAllow: !state.editAllow }));
    // console.log(get().editAllow);
  },
});

const useStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useStore;
