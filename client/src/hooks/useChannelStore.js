import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChannelStore = create(
  persist(
    (set, get) => ({
      channels: [],
      addChannel: (channel) => {
        const exists = get().channels.includes(channel);
        if (!exists) {
          set((state) => ({
            channels: [...state.channels, channel],
          }));
        }
      },
      removeChannel: (channel) => {
        set((state) => ({
          channels: state.channels.filter((c) => c !== channel),
        }));
      },
    }),
    {
      name: "favorite-channels",
    }
  )
);
