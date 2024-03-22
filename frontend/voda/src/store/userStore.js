import { create } from "zustand";
const useUserStore = create((set) => ({
  nickname: "신진호",
  coins: 0,
  diaryStreak: 0,
  setUserInfo: (userinfo) => {
    set(() => ({
      nickname: userinfo.nickname,
      coins: userinfo.coins,
      diaryStreak: userinfo.diaryStreak,
    }));
  },
}));

export default useUserStore;
