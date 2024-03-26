import { create } from "zustand";

const usePetStore = create((set) => ({
  // 상점 탭 (간식/효과)
  currentCategory: "food",
  setCurrentCategory: (category) => set({ currentCategory: category }),

  // 사용중인 간식
  usingFoodImgURl: "",
  setUsingFoodImgURl: (state) => set({ usingFoodImgURl: state }),

  // 사용중인 효과
  usingEffectImgURl: "",
  setUsingEffectImgURl: (state) => set({ usingEffectImgURl: state }),

  // 펫 감정
  emotion: "",
  setEmotion: (state) => set({ emotion: state }),

  // 펫 경험치
  exp: "",
  setExp: (state) => set({ exp: state }),

  // 펫 진화중?
  isEvolution: "",
  setIsEvolution: (state) => set({ isEvolution: state }),

  // 펫 밥 먹었는지
  isFeed: "",
  setIsFeed: (state) => set({ isFeed: state }),

  // 펫 레벨
  level: "",
  setLevel: (state) => set({ level: state }),

  // 펫 이름
  name: "",
  setName: (state) => set({ name: state }),

  // 펫 외형?
  petAppearance: "",
  setPetAppearance: (state) => set({ petAppearance: state }),

  // 펫id
  petId: "",
  setPetId: (state) => set({ petId: state }),

  // 펫 진화단계?
  stage: "",
  setStage: (state) => set({ stage: state }),

  // 상점 아이템
  items: [],
  setItems: (state) => set({ items: state }),
}));

export default usePetStore;
