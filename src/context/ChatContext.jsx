import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { getAllChatsOfUser } from "../services/apiChat";
import { useSocket } from "./SocketContext";
import { getCurrentTime } from "../helpers/helpers";
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
    case "setChats":
      return {
        ...state,
        chats: action.payload,
      };
    case "setOtherUser":
      return { ...state, otherUser: action.payload };
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
  }, []);

  useEffect(() => {
    socket.on("message", (messageData) => {
      if (messageData.sender !== user._id) {
        console.log(messageData);
        socket.emit("message_delivered", {
          roomId: messageData.roomId,
          messageId: messageData._id,
        });

        dispatch({ type: "setMessages", payload: messageData });
      }
    });
  }, [socket, user]);

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
