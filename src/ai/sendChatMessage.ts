import useConversationStore, { Message } from './conversationStore';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function sendChatMessage(userInput: string): Promise<string> {
  const store = useConversationStore.getState();
  const userMessage: Message = { role: 'user', content: userInput };
  store.addMessage(userMessage);
  const messages = useConversationStore.getState().conversationHistory;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage: Message = data.choices[0].message;
    store.addMessage(assistantMessage);

    return assistantMessage.content; 
  } catch (error) {
    console.error('Error calling API:', error);
    return '';
  }
}
