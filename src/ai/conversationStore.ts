import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
}

interface ConversationStore {
  conversationHistory: Message[];
  addMessage: (message: Message) => void;
  clearHistory: () => void;
}

const useConversationStore = create<ConversationStore, [["zustand/persist", ConversationStore]]>(
  persist(
    (set) => ({
      conversationHistory: [],
      addMessage: (message: Message) =>
        set((state) => ({
          conversationHistory: [...state.conversationHistory, message],
        })),
      clearHistory: () => set({ conversationHistory: [] }),
    }),
    {
      name: 'conversation-storage',
    }
  )
);

export default useConversationStore;
