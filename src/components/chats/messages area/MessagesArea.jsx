import { useEffect, useRef, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../ui/Loader";
import { getChatById } from "../../../services/apiChat";

function MessagesArea() {
  const { messages, dispatch, activeChatId } = useChat();
  const messagesEndRef = useRef(null);
  const messageArea = useRef(null);
  const previousScrollTop = useRef(0);
  const [showScrollToDown, setShowScrollToDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // It use to fetch messages automatic when user click on chat
  useEffect(() => {
    async function getChat() {
      setIsLoading(true);
      try {
        if (activeChatId) {
          const res = await getChatById(activeChatId);

          if (res.status === "success")
            dispatch({ type: "loadMessages", payload: res.chat.messages });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getChat();
  }, [activeChatId, dispatch, setIsLoading]);

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

  if (isLoading)
    return (
      <div className="bg-light-gray">
        <Loader />
      </div>
    );

  return (
    <div
      className="relative flex flex-grow flex-col items-end gap-2 overflow-y-scroll bg-light-gray px-14 py-3"
      ref={messageArea}
    >
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}

      {showScrollToDown && (
        <div
          className="fixed bottom-[6rem] right-[0.8rem] cursor-pointer"
          onClick={handleScrollToDown}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="rounded-full bg-[#005C4B] p-2 text-xl text-white"
          />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessagesArea;
