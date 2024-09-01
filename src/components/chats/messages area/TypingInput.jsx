import { useRef } from "react";
import { useChat } from "../../../context/ChatContext";
import EmojiPicker from "emoji-picker-react";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideClick from "../../../hooks/useOutsideClick";

function TypingInput() {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { message, setMessage, setMessages } = useChat();
  const [isOpen, setIsOpen] = useOutsideClick(emojiPickerRef, buttonRef);

  function handleSendClick() {
    if (message.length) {
      setMessages((messages) => [...messages, message]);
      setMessage("");
      inputRef.current.focus();
    }
  }

  function handleEmojiClick(e) {
    setMessage((message) => message + e.emoji);
    setIsOpen(false);
  }

  return (
    <div className="relative flex justify-between gap-3 border-t border-light-gray px-5 py-4">
      <div className="flex items-center gap-3">
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
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="w-[39rem] rounded-lg bg-[#eeeeee86] p-3 text-dark-gray outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        onClick={handleSendClick}
        className="rounded-lg bg-primary px-3 text-white outline-none transition-colors duration-150 hover:bg-dark-primary"
      >
        Send
      </button>
    </div>
  );
}

export default TypingInput;
