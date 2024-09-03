import { useEffect, useRef } from "react";
import { useChat } from "../../../context/ChatContext";
import EmojiPicker from "emoji-picker-react";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { getCurrentTime } from "../../../helpers/helpers";

function TypingInput() {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { message, setMessage, setMessages } = useChat();
  const [isOpen, setIsOpen] = useOutsideClick(emojiPickerRef, buttonRef);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSendClick() {
    if (message.content.length) {
      setMessages((messages) => [...messages, message]);
      setMessage((message) => {
        return { ...message, content: "" };
      });
    }
  }

  function handleEmojiClick(e) {
    setMessage((message) => {
      return {
        ...message,
        content: message.content === undefined ? "" : message.content + e.emoji,
      };
    });
    setIsOpen(false);
    inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && message.content.length) {
      setMessages((messages) => [...messages, message]);
      setMessage((message) => {
        return { ...message, content: "" };
      });
    }
  }

  return (
    <div className="relative flex justify-between gap-3 border-t border-light-gray px-5 py-4">
      <div className="flex items-center gap-5">
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
        <div className="flex items-center gap-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message"
            className="w-[39rem] rounded-lg bg-[#eeeeee86] p-3 text-dark-gray outline-none"
            value={message.content || ""}
            onChange={(e) =>
              setMessage(() => {
                return {
                  content: e.target.value,
                  sentAt: getCurrentTime(),
                };
              })
            }
            onKeyDown={handleKeyDown}
          />
          {message.content && (
            <img
              src="/message.svg"
              alt="icon"
              className="rounded-ful h-12 w-12 cursor-pointer"
              onClick={handleSendClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TypingInput;
