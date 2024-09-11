import { useEffect, useRef, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import EmojiPicker from "emoji-picker-react";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { getCurrentTime } from "../../../helpers/helpers";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";

function TypingInput() {
  const buttonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { dispatch, otherUser, inputRef, activeChatId } = useChat();
  const [isOpen, setIsOpen] = useOutsideClick(emojiPickerRef, buttonRef);
  const [message, setMessage] = useState({});
  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  function handleSendClick() {
    if (message.content.length) {
      dispatch({ type: "setMessages", payload: message });
      setMessage({ content: "" });

      socket.emit("message", {
        senderId: user._id,
        receiverId: otherUser._id,
        roomId: activeChatId,
        content: message.content,
      });
    }
  }

  function handleEmojiClick(e) {
    setMessage({
      content: message.content === undefined ? "" : message.content + e.emoji,
      sentAt: getCurrentTime(),
      sender: user._id,
      receiver: otherUser._id,
      isSeen: false,
      isSent: true,
    });

    setIsOpen(false);
    inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && message.content.length) {
      dispatch({ type: "setMessages", payload: message });
      setMessage({ content: "" });

      socket.emit("message", {
        senderId: user._id,
        receiverId: otherUser._id,
        roomId: activeChatId,
        content: message.content,
      });
    }
  }

  return (
    <div className="relative flex items-center gap-5 border-t border-light-gray px-5 py-4">
      <FontAwesomeIcon
        ref={buttonRef}
        onClick={() => setIsOpen((s) => !s)}
        icon={faFaceSmile}
        className="cursor-pointer text-2xl text-dark-gray"
      />
      {isOpen && (
        <div
          className="absolute bottom-[5rem] left-[3rem]"
          ref={emojiPickerRef}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="w-full rounded-lg bg-[#eeeeee86] p-3 text-dark-gray outline-none"
          value={message.content || ""}
          onChange={(e) =>
            setMessage({
              content: e.target.value,
              sentAt: getCurrentTime(),
              sender: user._id,
              receiver: otherUser._id,
              isSeen: false,
              isSent: true,
              isDelivered: false,
            })
          }
          onKeyDown={handleKeyDown}
        />
        {message.content && (
          <img
            src="/message.svg"
            alt="icon"
            className="rounded-ful h-12 w-12 cursor-pointer self-end"
            onClick={handleSendClick}
          />
        )}
      </div>
    </div>
  );
}

export default TypingInput;
