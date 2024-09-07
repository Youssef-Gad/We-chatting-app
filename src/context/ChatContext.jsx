import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
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
  activeChatId: "",
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
  const [roomId, setRoomId] = useState(null);
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
      if (messageData.senderId !== user._id) {
        console.log(messageData);

        dispatch({
          type: "setMessages",
          payload: {
            content: messageData.content,
            sentAt: getCurrentTime(),
            sender: messageData.senderId,
            receiver: messageData.receiverId,
            isSeen: false,
            isSent: true,
          },
        });
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
        roomId,
        setRoomId,
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
