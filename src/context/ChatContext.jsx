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
    case "updateMessages":
      const updatedMessages = state.messages.map((message) => {
        if (message._id === action.payload._id)
          return { ...message, isDelivered: true };
        else return message;
      });
      console.log(updatedMessages);

      return { ...state, messages: updatedMessages };
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
        // console.log(messageData);
        // if (otherUser._id) {
        //   socket.emit("message_delivered", {
        //     roomId: messageData.roomId,
        //     messageId: messageData._id,
        //     receiverId: otherUser._id,
        //   });
        // }

        dispatch({ type: "setMessages", payload: messageData });
      }
    });

    // socket.on("message_delivered", (messageData) => {
    //   if (messageData.sender === user._id) {
    //     console.log(messageData);
    //     // console.log(user._id);
    //     // dispatch({
    //     //   type: "updateMessages",
    //     //   payload: { _id: messageData._id, message: messageData },
    //     // });
    //   }
    // });
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
