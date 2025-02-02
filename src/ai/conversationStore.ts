/*
EXAMPLE USE CASE:
The process is as follows:
 * 1. Call `startSpeechToText()` to capture the user's answer via speech recognition.
 * 2. Pass the prompt ID, question, and captured answer to `processAndSaveQARecord()`,
 *    which will summarize the answer and store the complete QA record in memory.
 *
 * @example
 * async function askAndProcessQuestion(promptId, question) {
 *   const answer = await startSpeechToText();
 *   await processAndSaveQARecord(promptId, question, answer);
 * }
 * 
 * 3. To request a new question based on the user's previous answers, call `requestNextCareerPathQuestion()`.
 *   This function will generate a new question based on the user's previous answers. No need to pass any arguments.
*/

import { create } from 'zustand';
import { sendChatMessage } from './sendChatMessage';

// --------------------
// Interfaces & Types
// --------------------

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


export interface QARecord {
  promptId?: string;
  question: string;
  answer: string;
  summary: string;
}

// --------------------
// Zustand Store Interfaces
// --------------------

interface ConversationState {
  conversationHistory: Message[];
  addMessage: (msg: Message) => void;
  coreInfo: CoreInfo;
  setCoreInfo: (info: Partial<CoreInfo>) => void;
  qaRecords: QARecord[];
  addQARecord: (record: QARecord) => void;
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
  qaRecords: [],
  addQARecord: (record: QARecord) =>
    set((state) => ({
      qaRecords: [...state.qaRecords, record],
    })),
}));

// --------------------
// Summarization Function
// --------------------

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
// Process & Save a QA Record
// --------------------

/**
 * Given a prompt (question) and the user's answer (from speech-to-text),
 * this function will:
 * 1. Summarize the answer behind the scenes.
 * 2. Save a QA record (question, answer, summary) to our in‑memory store.
 *
 * @param promptId A unique ID for this question.
 * @param question The question asked.
 * @param answer The answer received (e.g. from speech-to-text).
 */
export async function processAndSaveQARecord(promptId: string, question: string, answer: string): Promise<void> {
  const summary = await summarizeResponse(answer);
  const record: QARecord = {
    promptId,
    question,
    answer,
    summary,
  };
  useConversationStore.getState().addQARecord(record);
}

export async function requestNextCareerPathQuestion(): Promise<string> {
  const store = useConversationStore.getState();

  const previousQuestions = store.qaRecords.map(record => record.question).join("\n");
  const previousAnswers = store.qaRecords.map(record => record.answer).join("\n");

  const prompt = `
Based on the user's previous responses and questions, please generate a new, unique question about their career path.
Do not repeat any questions that have already been asked.

Previously asked questions:
${previousQuestions}

User responses:
${previousAnswers}

Next career-related question:
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextQuestion: any = await sendChatMessage(prompt);
  console.log("Generated next career path question:", nextQuestion);
  return nextQuestion;
}

// --------------------
// Default Export
// --------------------

export default useConversationStore;
