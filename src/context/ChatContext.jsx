import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { getAllChatsOfUser } from "../services/apiChat";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

const initialState = {
  messages: [],
  chats: [],
  otherUser: {},
  activeChatId: null,
  isLoading: false,
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
      console.log(action.payload);

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
    case "setOtherUser":
      return { ...state, otherUser: action.payload };
    case "setOtherUsers":
      return { ...state, otherUsers: [...state.otherUsers, action.payload] };
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setActiveChatId":
      return { ...state, activeChatId: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ChatProvider({ children }) {
  const [{ otherUser, messages, isLoading, chats, activeChatId }, dispatch] =
    useReducer(chatReducer, initialState);
  const inputRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchChats() {
      dispatch({ type: "setIsLoading", payload: true });
      try {
        const res = await getAllChatsOfUser();

        if (res.status === "Success") {
          dispatch({ type: "setChats", payload: res.chats });
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "setIsLoading", payload: false });
      }
    }
    fetchChats();
  }, [dispatch]);

  useEffect(() => {
    const handleMessage = (messageData) => {
      dispatch({ type: "setMessages", payload: messageData });

      socket.emit("message_delivered", {
        senderId: messageData.sender,
        roomId: messageData.roomId,
        messageId: messageData._id,
      });
    };

    const handleMessageIsSaved = (messageData) => {
      dispatch({ type: "setMessages", payload: messageData });
    };

    const handleIsDelivered = (messageData) => {
      dispatch({
        type: "updateMessagesIsDelivered",
        payload: { _id: messageData._id, message: messageData },
      });

      socket.emit("is_receiver_connected_to_room", {
        receiverId: messageData.receiver,
        roomId: messageData.roomId,
        messageId: messageData._id,
      });
    };

    const handleMessageIsSeen = (messageData) => {
      dispatch({
        type: "updateMessagesIsSeen",
        payload: { _id: messageData._id, message: messageData },
      });
    };

    socket.on("message_delivered", handleIsDelivered);

    socket.on("message", handleMessage);

    socket.on("message_is_saved", handleMessageIsSaved);

    socket.on("message_seen", handleMessageIsSeen);

    return () => {
      socket.off("message", handleMessage);
      socket.off("message_delivered", handleIsDelivered);
      socket.off("message_is_saved", handleMessageIsSaved);
      socket.off("message_seen", handleMessageIsSeen);
    };
  }, [socket, otherUser._id, user._id]);

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
