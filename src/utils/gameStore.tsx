import { create } from "zustand";

export const useGameStore = create<ConvoState>()((set) => ({
  isGameStarted: false,
  isGameOver: false,
  progress: 0,

  setProgress: (progress: number) => set({ progress }),
  setGameStarted: (isGameStarted: boolean) => set({ isGameStarted }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
  incrementProgress: () => set((state) => ({ progress: state.progress + 1 })),
}));
