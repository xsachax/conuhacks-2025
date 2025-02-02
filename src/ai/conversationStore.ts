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


export interface PromptResponses {
  [promptId: string]: string;
}


interface ConversationState {
  conversationHistory: Message[];
  addMessage: (msg: Message) => void;
  coreInfo: CoreInfo;
  setCoreInfo: (info: Partial<CoreInfo>) => void;
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
// Zustand Store
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
}));

// --------------------
// Local Storage Functions
// --------------------

const CORE_INFO_KEY = "coreInfo";
const PROMPT_RESPONSES_KEY = "promptResponses";

export function saveCoreInfo(coreInfo: CoreInfo): void {
  localStorage.setItem(CORE_INFO_KEY, JSON.stringify(coreInfo));
}

export function loadCoreInfo(): CoreInfo | null {
  const stored = localStorage.getItem(CORE_INFO_KEY);
  return stored ? (JSON.parse(stored) as CoreInfo) : null;
}

export function savePromptResponse(promptId: string, summary: string): void {
  const stored = localStorage.getItem(PROMPT_RESPONSES_KEY);
  const responses: PromptResponses = stored ? JSON.parse(stored) : {};
  responses[promptId] = summary;
  localStorage.setItem(PROMPT_RESPONSES_KEY, JSON.stringify(responses));
}

// --------------------
// Summarization Functions
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

export async function processAndSavePromptResponse(promptId: string, response: string): Promise<void> {
  const summary = await summarizeResponse(response);
  savePromptResponse(promptId, summary);
}

// --------------------
// Default Export
// --------------------

export default useConversationStore;
