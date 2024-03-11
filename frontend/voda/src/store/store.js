import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 디버깅 용도

const store = (set) => ({
  isLoggedIn: false,
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
});

const useStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useStore;
