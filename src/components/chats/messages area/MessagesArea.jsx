import { useEffect, useRef, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function MessagesArea() {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);
  const messageArea = useRef(null);
  const previousScrollTop = useRef(0);
  const [showScrollToDown, setShowScrollToDown] = useState(false);

  function handleScrollToDown() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    handleScrollToDown();
  }, [messages]);

  const handleScroll = () => {
    if (messageArea.current) {
      const scrollTop = messageArea.current.scrollTop;
      const scrollDiff = previousScrollTop.current - scrollTop;

      if (scrollDiff > 10) setShowScrollToDown(true);
      else if (scrollDiff <= 0) setShowScrollToDown(false);

      previousScrollTop.current = scrollTop;
    }
  };

  useEffect(() => {
    const div = messageArea.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-grow flex-col items-end gap-2 overflow-y-scroll bg-light-gray px-14 py-3"
      ref={messageArea}
    >
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}

      {messages.map((message, i) => (
        <Message message={message} key={i} otheruser={true} />
      ))}

      {showScrollToDown && (
        <div
          className="fixed bottom-[6rem] right-[1.5rem] cursor-pointer"
          onClick={handleScrollToDown}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="rounded-full bg-primary p-3 text-xl text-white"
          />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessagesArea;
