// conversationStore.ts
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
  promptId: string;
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

// --------------------
// Default Export
// --------------------

export default useConversationStore;
