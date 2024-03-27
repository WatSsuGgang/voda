import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// export const useUserStore = create((set) => ({
//   nickname: "",
//   coins: 0,
//   diaryStreak: 0,
//   setUserInfo: (userinfo) => {
//     set(() => ({
//       nickname: userinfo.nickname,
//       coins: userinfo.coins,
//       diaryStreak: userinfo.diaryStreak,
//     }));
//   },
// }));

export const useUserStore = create(
  persist(
    (set, get) => ({
      nickname: "",
      coins: 0,
      diaryStreak: 0,
      setUserInfo: (userinfo) => {
        set(() => ({
          nickname: userinfo.nickname,
          coins: userinfo.coins,
          diaryStreak: userinfo.diaryStreak,
        }));
      },
    }),
    {
      name: "user-info-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
