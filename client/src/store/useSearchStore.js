import { create } from "zustand";

export const useSearchStore = create((set) => ({
  keyword: "",
  setKeyword: (value) => set({ keyword: value }),
  sort: "latest",
  setSort: (value) => set({ sort: value }),
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));
