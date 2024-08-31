import { useRef } from "react";
import { useChat } from "../../../context/ChatContext";

function TypingInput() {
  const { message, setMessage, setMessages } = useChat();
  const inputRef = useRef(null);

  function handleClick() {
    if (message.length) {
      setMessages((messages) => [...messages, message]);
      setMessage("");
      inputRef.current.focus();
    }
  }

  function handleEnterKey(e) {
    if (e.key === "enter") console.log("enter");
  }

  return (
    <div className="flex justify-between border-t border-light-gray px-5 py-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message"
        className="w-[40rem] rounded-lg bg-[#eeeeee86] p-3 text-dark-gray outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onKeyDown={(e) => handleEnterKey}
        onClick={handleClick}
        className="rounded-lg bg-primary px-3 text-white outline-none transition-colors duration-150 hover:bg-dark-primary"
      >
        Send
      </button>
    </div>
  );
}

export default TypingInput;
