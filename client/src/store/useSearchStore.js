import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      keyword: "",
      sort: "viewsDesc",
      filter: "all",
      shorts: [],

      setKeyword: (k) => set({ keyword: k }),
      setSort: (s) => set({ sort: s }),
      setFilter: (f) => set({ filter: f }),
      setShorts: (data) => set({ shorts: data }),
    }),
    {
      name: "search-storage", // localStorage에 저장될 키
      partialize: (state) => ({
        keyword: state.keyword,
        sort: state.sort,
        filter: state.filter,
        shorts: state.shorts,
      }),
    }
  )
);
