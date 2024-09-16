import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useChat } from "./ChatContext";
import { getAllChatsOfUser } from "../services/apiChat";
import { getCurrentTime } from "../helpers/helpers";

const SocketContext = createContext();
const socket = io("http://localhost:3000");

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const { dispatch, activeChatId } = useChat();

  useEffect(() => {
    if (user._id) {
      socket.emit("connect_user", user._id);
    }
  }, [user._id]);

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
      if (messageData.toBeSentRoom._id === activeChatId)
        dispatch({ type: "setMessages", payload: messageData });

      socket.emit("message_delivered", {
        senderId: messageData.sender,
        roomId: messageData.toBeSentRoom._id,
        messageId: messageData._id,
      });

      if (activeChatId === null) {
        dispatch({
          type: "setUnreadMessages",
          payload: messageData.toBeSentRoom._id,
        });
      }

      dispatch({ type: "updateChats", payload: messageData.toBeSentRoom });

      dispatch({
        type: "updateChatsStatus",
        payload: {
          activeChatId: messageData.toBeSentRoom._id,
          content: messageData.content,
          sentAt: getCurrentTime(),
        },
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

      if (activeChatId === messageData.roomId)
        socket.emit("is_receiver_connected_to_room", {
          receiverId: messageData.receiver,
          roomId: messageData.roomId,
          messageId: messageData._id,
        });
    };

    const handleMessageIsSeen = (messageData) => {
      console.log("seen");

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
  }, [activeChatId, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined)
    throw new Error("SocketContext was used outside of SocketProvider");
  return context;
}
