import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePetStore = create((set) => ({
  // 상점 탭 (간식/효과)
  currentCategory: "food",
  setCurrentCategory: (category) => set({ currentCategory: category }),

  // 사용중인 아이템, 이펙트
  using: "",
  setUsing: (state) => set({ using: state }),

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

  // 구매한 아이템
  boughtItems: [],
  setBoughtItems: (state) => set({ boughtItems: state }),

  // 구매 안한 아이템
  displayItems: [],
  setDisplayItems: (state) => set({ displayItems: state }),
}));

export const usePetPersistStore = create(
  persist(
    (set, get) => ({
      usingId: "",
      setUsingId: (state) => set({ usingId: state }),
    }),
    {
      name: "using-id-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
