import { create } from "zustand";

interface GameResults {
  job1: string;
  accuracy1: string;
  job2: string;
  accuracy2: string;
  job3: string;
  accuracy3: string;
  criteria1: string;
  criteria2: string;
  criteria3: string;
}

interface GameStore {
  isGameStarted: boolean;
  isGameReadyToEnd: boolean;
  isGameEnded: boolean;
  progress: number;
  gameResults: GameResults;
  gameResultsAcquired: boolean;
  setProgress: (progress: number) => void;
  setGameStarted: (isGameStarted: boolean) => void;
  incrementProgress: () => void;
  setGameReadyToEnd: (isGameReadyToEnd: boolean) => void;
  setGameEnded: (isGameEnded: boolean) => void;
  setGameResultsAcquired: (gameResultsAcquired: boolean) => void;
  setGameResults: (gameResults: GameResults) => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  isGameStarted: false,
  isGameReadyToEnd: false,
  isGameEnded: false,
  progress: 0,
  gameResults: {
    // dummy data as placeholder
    job1: "Software Engineer",
    accuracy1: "95",
    job2: "Product Manager",
    accuracy2: "82",
    job3: "Engineer Consultant",
    accuracy3: "30",
    criteria1: "Flexibility",
    criteria2: "Problem Solving",
    criteria3: "Career Growth",
  },
  gameResultsAcquired: false,

  setProgress: (progress: number) => set({ progress }),
  setGameStarted: (isGameStarted: boolean) => set({ isGameStarted }),
  incrementProgress: () => set((state) => ({ progress: state.progress + 1, isGameReadyToEnd: state.progress + 1 >= 5 })),
  setGameReadyToEnd: (isGameReadyToEnd: boolean) => set({ isGameReadyToEnd }),
  setGameEnded: (isGameEnded: boolean) => set({ isGameEnded }),
  setGameResultsAcquired: (gameResultsAcquired: boolean) => set({ gameResultsAcquired }),
  setGameResults: (gameResults: GameResults) => set({ gameResults }),
}));
