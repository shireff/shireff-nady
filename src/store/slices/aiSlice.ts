import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // Use string for serializability
  language?: "ar" | "en";
  options?: string[];
  topic?: string;
  projectId?: string;
}

interface AIState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}

const initialState: AIState = {
  isOpen: false,
  messages: [
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi! I'm Shireff’s AI Assistant. How may I help you today?",
      timestamp: new Date().toISOString(),
      language: "en",
      options: ["View Projects", "View Experience", "Contact Shireff"],
      topic: "greeting"
    },
  ],
  isLoading: false,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateLastAssistantMessage: (state, action: PayloadAction<{ content: string; options?: string[] }>) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content = action.payload.content;
        if (action.payload.options) {
          lastMessage.options = action.payload.options;
        }
      }
    },
    removeTypingIndicator: (state) => {
      state.messages = state.messages.map(m => 
        m.content.endsWith("⌛") ? { ...m, content: m.content.replace("⌛", "") } : m
      );
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearHistory: (state) => {
      state.messages = initialState.messages;
    }
  },
});

export const { 
  setIsOpen, 
  toggleIsOpen, 
  addMessage, 
  updateLastAssistantMessage, 
  removeTypingIndicator,
  setIsLoading,
  clearHistory 
} = aiSlice.actions;

export default aiSlice.reducer;
