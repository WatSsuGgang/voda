import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePetStore = create((set) => ({
  petTouched: false,
  setPetTouched: (state) => set({ petTouched: state }),

  petMap: {
    1: { 달걀: "Food/Egg.png" },
    2: { 병아리: "Animals/Hatching%20Chick.png" },
    3: {
      앵무새: "Animals/Parrot.png",
      펭귄: "Animals/Penguin.png",
      독수리: "Animals/Eagle.png",
      상어: "Animals/Shark.png",
      도도새: "Animals/Dodo.png",
      비둘기: "Animals/Dove.png",
      고래: "Animals/Spouting%20Whale.png",
      고릴라: "Animals/Gorilla.png",
      나무늘보: "Animals/Sloth.png",
      용: "Animals/Dragon.png",
      티라노: "Animals/T-Rex.png",
      다람쥐: "Animals/Chipmunk.png",
      부엉이: "Animals/Owl.png",
      "검은 고양이": "Animals/Black%20Cat.png",
      까마귀: "Animals/Black%20Bird.png",
      수달: "Animals/Otter.png",
    },
  },

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
      usingId: {
        food: { itemId: 0, ownId: 0 }, // 기본값으로 설정할 수 있는 값으로 초기화
        effect: { itemId: 0, ownId: 0 }, // 기본값으로 설정할 수 있는 값으로 초기화
      },
      setUsingId: (state) => set({ usingId: state }),
    }),
    {
      name: "using-id-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
