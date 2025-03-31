// src/store/useDevStore.js
import { create } from "zustand";

export const useDevStore = create((set) => ({
  devMode: false,
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
}));
