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
      q1: "What are your favorite hobbies or activities that you enjoy in your free time?",
      q2: "What subjects or topics are you naturally curious about or interested in?",
      q3: "What skills or talents do you feel you excel at without much effort?",
    },
    part2: {
      q1: "Do you prefer working on hands-on projects or theoretical concepts?",
      q2: "Do you enjoy working in a team or do you prefer working alone?",
      q3: "Do you thrive in a structured environment or a more flexible one?",
    },
    part3: {
      q1: "Based on your interests, would you prefer a career in technology, healthcare, arts, or another field?",
      q2: "Do you see yourself in a creative role, analytical role, or a mix of both?",
      q3: "Are you more interested in a career that involves problem-solving, helping others, or creating something new?",
    },
    part4: {
      q1: "Within your chosen field, are there specific roles that you find particularly appealing?",
      q2: "What daily responsibilities or tasks do you think you would enjoy in your ideal job?",
      q3: "Are there any specific industries or companies you are particularly interested in working for?",
    },
    part5: {
      q1: "How important is job stability and security to you in your career?",
      q2: "What are your salary expectations for your ideal job?",
      q3: "Are you willing to pursue additional education or certifications to achieve your career goals?",
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
