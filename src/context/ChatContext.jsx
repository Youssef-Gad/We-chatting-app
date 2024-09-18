import { createContext, useContext, useReducer, useRef } from "react";

const ChatContext = createContext();

const initialState = {
  messages: [],
  chats: [],
  otherUser: {},
  activeChatId: null,
  isLoading: false,
  unreadMessages: localStorage.getItem("unreadMessages")
    ? JSON.parse(localStorage.getItem("unreadMessages"))
    : [],
};

function chatReducer(state, action) {
  switch (action.type) {
    case "loadMessages":
      return { ...state, messages: [...action.payload] };
    case "setMessages":
      return { ...state, messages: [...state.messages, action.payload] };
    case "updateMessagesIsDelivered":
      const updatedMessagesIsDelivered = state.messages.map((message) => {
        if (message._id === action.payload._id)
          return {
            ...message,
            isDelivered: true,
          };
        else return message;
      });

      return { ...state, messages: updatedMessagesIsDelivered };
    case "updateMessagesIsSeen":
      const updatedMessagesIsSeen = state.messages.map((message) => {
        if (message._id === action.payload._id)
          return {
            ...message,
            isSeen: true,
          };
        else return message;
      });

      return { ...state, messages: updatedMessagesIsSeen };
    case "setChats":
      return {
        ...state,
        chats: action.payload,
      };
    case "updateChats":
      const findChat = state.chats.filter(
        (chat) => chat._id === action.payload._id,
      );
      if (findChat.length) return { ...state };

      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };
    case "updateChatsStatus":
      const updatedChatsStatus = state.chats.map((chat) => {
        if (chat._id === action.payload.activeChatId) {
          return {
            ...chat,
            lastSentMessage: {
              ...chat.lastSentMessage,
              content: action.payload.content,
              sentAt: action.payload.sentAt,
            },
          };
        } else return chat;
      });

      const firstChat = updatedChatsStatus.filter(
        (chat) => chat._id === action.payload.activeChatId,
      );

      const chatAfterFilter = updatedChatsStatus.filter(
        (chat) => chat._id !== action.payload.activeChatId,
      );

      chatAfterFilter.unshift(...firstChat);

      return {
        ...state,
        chats: chatAfterFilter,
      };
    case "setUnreadMessages":
      localStorage.setItem(
        "unreadMessages",
        JSON.stringify([...state.unreadMessages, action.payload]),
      );
      return {
        ...state,
        unreadMessages: [...state.unreadMessages, action.payload],
      };
    case "deleteUnreadMessages":
      return { ...state, unreadMessages: [] };
    case "setOtherUser":
      return { ...state, otherUser: action.payload };
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setActiveChatId":
      return { ...state, activeChatId: action.payload };
    case "deleteActiveChatId":
      return { ...state, activeChatId: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ChatProvider({ children }) {
  const [
    { otherUser, messages, isLoading, chats, activeChatId, unreadMessages },
    dispatch,
  ] = useReducer(chatReducer, initialState);
  const inputRef = useRef(null);

  return (
    <ChatContext.Provider
      value={{
        otherUser,
        messages,
        isLoading,
        chats,
        activeChatId,
        dispatch,
        inputRef,
        unreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("ChatContext was used outside of ChatProvider");
  return context;
}
