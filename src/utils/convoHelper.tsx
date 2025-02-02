import { create } from "zustand";

interface ConvoState {
  convoActive: boolean;
  currentCharacterName: string;
  currentPart: number;
  currentQuestion: number;
  questions: Record<string, Record<string, string>>;
  seenCharacters: string[];
  setConvoActive: (convo: boolean) => void;
  clearConvo: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateQuestions: (part: string, question: any) => void;
  setCurrentQuestion: (question: number) => void;
  setCurrentPart: (part: number) => void;
}

export const useConvoStore = create<ConvoState>()((set) => ({
  convoActive: false,
  currentCharacterName: "",
  currentPart: 1,
  currentQuestion: 0,
  seenCharacters: [],
  answers: {
    part1: {
      a1: "",
      a2: "",
      a3: "",
    },
    part2: {
      a1: "",
      a2: "",
      a3: "",
    },
    part3: {
      a1: "",
      a2: "",
      a3: "",
    },
    part4: {
      a1: "",
      a2: "",
      a3: "",
    },
    part5: {
      a1: "",
      a2: "",
      a3: "",
    },
  },
  questions: {
    part1: {
      q1: "Part 1, Question 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      q2: "Part 1, Question 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      q3: "Part 1, Question 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    part2: {
      q1: "Part 2, Question 1: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      q2: "Part 2, Question 2: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      q3: "Part 2, Question 3: Deserunt mollit anim id est laborum.",
    },
    part3: {
      q1: "Part 3, Question 1: Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
      q2: "Part 3, Question 2: Nullam varius, turpis et commodo pharetra, est eros bibendum elit.",
      q3: "Part 3, Question 3: Velit egestas dui id ornare arcu odio ut sem nulla.",
    },
    part4: {
      q1: "Part 4, Question 1: Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      q2: "Part 4, Question 2: Senectus et netus et malesuada fames ac turpis egestas.",
      q3: "Part 4, Question 3: Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet.",
    },
    part5: {
      q1: "Part 5, Question 1: Ante in nibh mauris cursus mattis molestie a iaculis.",
      q2: "Part 5, Question 2: Arcu odio ut sem nulla pharetra diam sit amet.",
      q3: "Part 5, Question 3: Eget nullam non nisi est sit amet facilisis magna.",
    },
  },

  // Set the current convo
  setConvoActive: (newState) => set({ convoActive: newState }),

  // Clear the convo and reset history and slider values
  clearConvo: (properExit) =>
    set((prevState) => ({
      convoActive: false,
      currentPart: properExit ? prevState.currentPart + 1 : prevState.currentPart,
      currentQuestion: 0,
      seenCharacters: properExit ? [...prevState.seenCharacters, prevState.currentCharacterName] : prevState.seenCharacters,
      currentCharacterName: "",
      answers: properExit
        ? prevState.answers
        : {
            ...prevState.answers,
            [`part${prevState.currentPart}`]: {
              a1: "",
              a2: "",
              a3: "",
            },
          },
    })),

  updateQuestions: (part, questions) =>
    set((prevState) => {
      const newQuestions = { ...prevState.questions, [part]: questions };
      return { questions: newQuestions };
    }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setCurrentPart: (part) => set({ currentPart: part }),
  addSeenCharacter: (character) =>
    set((state) => {
      const newSeenCharacters = [...state.seenCharacters, character];
      return { seenCharacters: newSeenCharacters };
    }),
  setCurrentCharacterName: (name) => set({ currentCharacterName: name }),
}));
