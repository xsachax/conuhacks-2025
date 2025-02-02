/**
 * EXAMPLE USE CASE:
 *
 * The process is as follows:
 *
 * 1. Request new career path questions:
 *    - Call `requestNextCareerPathQuestions()` to generate three new, unique career-related questions.
 *      These questions are stored in the in-memory store.
 *
 *
 * 2. For each question the user answers:
 *    - Capture the user's answer using speech-to-text (via `startSpeechToText()`).
 *    - Call `submitAnswer(answer)` with the user's answer. This stores the complete record 
 *      (question, answer, and summary) in the in-memory store.
 *
 * @example
 * const questions = await requestNextCareerPathQuestions();
 * questions.forEach((q, index) => {
 *   console.log(`Question ${index + 1}: ${q}`);
 * });
 *
 * async function handleUserAnswer(spokenAnswer: string) {
 *   await submitAnswer(spokenAnswer);
 *   console.log("Answer submitted for the next pending question.");
 * }
 */

import { create } from 'zustand';
import { sendChatMessage } from './sendChatMessage';
import { useConvoStore } from '../utils/convoHelper'

// =========================================
// Message interface used for chat history.
// =========================================
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  timestamp?: number;
}

export interface CoreInfo {
  age: number; // e.g., 25 
  stageOfLife: string; // e.g., "Student" or "Professional"
  favoriteHobbyOrSubject: string; // Either a preset option or user-provided text
  preferredLearningStyle: string; // e.g., "Theory", "Hands-on", "Mixed"
  teamworkOrSolo: string; // e.g., "Teamwork" or "Solo"
  problemSolvingMethod: string; // e.g., "I prefer to plan and strategize before acting"
}

// =========================================
// Represents a stored career answer record.
// ========================================= 
export interface CareerAnswerRecord {
  promptId: string;
  question: string;
  answer: string;
  summary: string;
}

// ==============================
// Zustand store state interface.
// ==============================
interface ConversationState {
  part: number; 
  incrementPart: () => void;
  conversationHistory: Message[];
  addMessage: (msg: Message) => void;
  coreInfo: CoreInfo;
  setCoreInfo: (info: Partial<CoreInfo>) => void;
  careerQuestions: string[];
  addCareerQuestions: (questions: string[]) => void;
  careerAnswers: CareerAnswerRecord[];
  addCareerAnswer: (records: CareerAnswerRecord[]) => void; 
}

// --------------------
// Default Core Info
// --------------------

const defaultCoreInfo: CoreInfo = {
  age: 0,
  stageOfLife: "",
  favoriteHobbyOrSubject: "",
  preferredLearningStyle: "",
  teamworkOrSolo: "",
  problemSolvingMethod: "",
};

// --------------------
// Create Zustand Store
// --------------------

const useConversationStore = create<ConversationState>((set) => ({
  conversationHistory: [],
  addMessage: (msg: Message) =>
    set((state) => ({
      conversationHistory: [...state.conversationHistory, msg],
    })),
  coreInfo: defaultCoreInfo,
  setCoreInfo: (info: Partial<CoreInfo>) =>
    set((state) => ({
      coreInfo: { ...state.coreInfo, ...info },
    })),
  careerQuestions: [],
  addCareerQuestions: (questions: string[]) =>
    set((state) => ({
      careerQuestions: [...state.careerQuestions, ...questions],
    })),
  careerAnswers: [],
  addCareerAnswer: (records: CareerAnswerRecord[]) =>
    set((state) => ({
      careerAnswers: [...state.careerAnswers, ...records],
    })),
  part: 1,
  incrementPart: () =>
    set((state) => ({
      part: state.part + 1,
    })),
}));

// --------------------
// Summarization Function
// --------------------

/**
 * Uses sendChatMessage to summarize a user's answer.
 * The summarization prompt is created here; sendChatMessage is expected to return the assistant's reply as a string.
 */
export async function summarizeResponse(response: string): Promise<string> {
  const prompt = `Summarize the following user response in one sentence: "${response}"`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const summary: any = await sendChatMessage(prompt);
    return summary;
  } catch (error) {
    console.error("Error summarizing response:", error);
    return response; 
  }
}

// --------------------
// Request Next Career Path Questions
// --------------------

export async function requestNextCareerPathQuestions(): Promise<{ q1: string; q2: string; q3: string }> {
  const store = useConversationStore.getState();
  const convoStore = useConvoStore.getState(); 

  const currentPart = store.part;
  const previousQuestions = store.careerQuestions.join("\n");
  const previousAnswers = store.careerAnswers.map(record => record.answer).join("\n");

  const prompt = `
    You are an expert AI career advisor guiding the user through a structured **five-part** conversation to identify their best-fit career path. 
    This process involves 15 targeted questions over 5 stages, rapidly narrowing down career options.

    **CURRENT STAGE: Part ${currentPart}/5**
    **STRICT RULES:**
    - You MUST output exactly three (3) career-related questions.
    - Each question MUST be on its own line with NO extra text, explanations, formatting, or additional context.
    - The conversation MUST progress logically: 
        - **Stage 1 (Interest Discovery - Questions 1-3):** Identify passions, hobbies, and natural skills.
        - **Stage 2 (Work Preferences - Questions 4-6):** Hands-on vs. theoretical, teamwork vs. solo, structured vs. flexible environments.
        - **Stage 3 (Career Direction - Questions 7-9):** Suggest broad career categories based on interests and preferences.
        - **Stage 4 (Refinement - Questions 10-12):** Narrow down to specific roles within a field, discussing daily responsibilities.
        - **Stage 5 (Realities - Questions 13-15):** Cover job stability, salary expectations, required education, and long-term growth.

    **USER CONTEXT:**
    - Previously asked questions:
      ${previousQuestions}
    - User responses:
      ${previousAnswers}

    **GENERATE THE NEXT THREE QUESTIONS STRICTLY FOLLOWING THE FORMAT BELOW:**
    - Each question should be SHORT, DIRECT, and focused on quickly guiding the user to a specific career.
    - Do NOT repeat previously asked questions.
    - Do NOT provide any explanations or context.

    **NEXT THREE QUESTIONS (one per line, NO extra text):**
  `.trim();


  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await sendChatMessage(prompt);

    if (typeof response !== "string") {
      console.error("Invalid response format:", response);
      throw new Error("sendChatMessage did not return a string");
    }

    console.log("Generated next career path questions:", response);

    const questions = response
      .split("\n")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0);

    if (questions.length !== 3) {
      console.warn(`Expected 3 questions, but got ${questions.length}. Using fallback.`);
      return {
        q1: "What subjects or activities do you enjoy the most?",
        q2: "Do you prefer working with people, technology, or data?",
        q3: "Would you rather work in a structured office environment or a more flexible setting?"
      };
    }

    store.addCareerQuestions(questions);

    convoStore.updateQuestions(`part${store.part}`, {
      q1: questions[0],
      q2: questions[1],
      q3: questions[2],
    });

    return {
      q1: questions[0] || "",
      q2: questions[1] || "",
      q3: questions[2] || ""
    };
  } catch (error) {
    console.error("Error requesting career path questions:", error);
    return { q1: "", q2: "", q3: "" };
  }
}


// --------------------
// Submit an Answer for the Next Question
// --------------------

export async function submitAnswers({ a1, a2, a3 }: { a1: string; a2: string; a3: string }): Promise<void> {
  const store = useConversationStore.getState();

  const answers = [a1, a2, a3].filter(answer => answer.trim() !== "");

  if (store.careerQuestions.length < answers.length) {
    return;
  }

  const records: CareerAnswerRecord[] = [];
  const currentPart = store.part;

  for (let i = 0; i < answers.length; i++) {
    const question = store.careerQuestions.shift() as string;
    const promptId = `${Date.now()}-part${currentPart}`;

    const summary = await summarizeResponse(answers[i]);

    records.push({
      promptId,
      question,
      answer: answers[i],
      summary,
    });
  }

  store.addCareerAnswer(records);
  store.incrementPart();
}
// --------------------
// Default Export
// --------------------

export default useConversationStore;
