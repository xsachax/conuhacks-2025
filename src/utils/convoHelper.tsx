import { create } from "zustand";

export interface ConvoOption {
  text: string;
  next?: Convo | null;
  action?: () => void;
  type?: "default" | "slider";
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  sliderValue?: number;
  onEnd?: () => void;
}

export interface Convo {
  text: string;
  stage: string;
  character: string;
  next?: Convo | null;
  options?: ConvoOption[];
  onEnd?: () => void;
}

interface ConvoState {
  currentConvo: Convo | null;
  convoHistory: Convo[];
  sliderValues: Record<string, number>; // Stores slider values by key
  setConvo: (convo: Convo | null) => void;
  selectOption: (option: ConvoOption) => void;
  setSliderValue: (key: string, value: number) => void;
  clearConvo: () => void;
}

export const useConvoStore = create<ConvoState>()((set) => ({
  currentConvo: null,
  convoHistory: [],
  sliderValues: {}, // Store slider values

  // Set the current convo
  setConvo: (convo) => set({ currentConvo: convo }),

  // Select an option and transition to the next convo or execute an action
  selectOption: (option) =>
    set((state) => {
      if (option.action) {
        option.action(); // Execute option's action
      }
      return {
        currentConvo: option.next || null, // Move to the next convo, or clear if no next exists
        convoHistory: state.currentConvo ? [...state.convoHistory, state.currentConvo] : state.convoHistory, // Keep history of visited convos
      };
    }),

  // Update a specific slider value by key
  setSliderValue: (key, value) =>
    set((state) => ({
      sliderValues: {
        ...state.sliderValues,
        [key]: value,
      },
    })),

  // Clear the convo and reset history and slider values
  clearConvo: () => set({ currentConvo: null, convoHistory: [], sliderValues: {} }),
}));
