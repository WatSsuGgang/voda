import { create } from "zustand";

const usePetStore = create((set) => ({
  currentCoin: 10,
  currentFood: "Candy",
  currentEffect: "cloud rain",

  // 상점 탭 (간식/효과)
  currentCategory: "food",
  setCurrentCategory: (category) => set({ currentCategory: category }),

  // ?
  owned: [],
  setOwned: (state) => set({ owned: state }),

  // 펫 감정
  emotion: null,
  setEmotion: (state) => set({ emotion: state }),

  // 펫 경험치
  exp: null,
  setExp: (state) => set({ exp: state }),

  // 펫 진화중?
  isEvolution: null,
  setIsEvolution: (state) => set({ isEvolution: state }),

  // 펫 밥 먹었는지
  isFeed: null,
  setIsFeed: (state) => set({ isFeed: state }),

  // 펫 레벨
  level: null,
  setLevel: (state) => set({ level: state }),

  // 펫 이름
  name: null,
  setName: (state) => set({ name: state }),

  // 펫 외형?
  petAppearance: null,
  setPetAppearance: (state) => set({ petAppearance: state }),

  // 펫id
  petId: null,
  setPetId: (state) => set({ petId: state }),

  // 펫 진화단계?
  stage: null,
  setStage: (state) => set({ stage: state }),

  // 상점 아이템
  items: [],
  setItems: (state) => set({ items: state }),
}));

export default usePetStore;
