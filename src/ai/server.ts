import { sendChatMessage } from './sendChatMessage';
import useConversationStore from './conversationStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).sendChatMessage = sendChatMessage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).conversationStore = useConversationStore;
