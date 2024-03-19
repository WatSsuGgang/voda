import { create } from "zustand";

const usePetStore = create((set) => ({
  currentCoin: 10,
  currentFood: "Candy",
  currentEffect: "cloud rain",
  currentCategory: "food",
  isFed: false,
  setIsFed: (state) => set({ isFed: state }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));

export default usePetStore;
