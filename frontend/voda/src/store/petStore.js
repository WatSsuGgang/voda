import { create } from "zustand";

const usePetShopStore = create((set) => ({
  currentCoin: 10,
  currentFood: "candy",
  currentEffect: "cloud rain",
  currentCategory: "food",
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));

export default usePetShopStore;
