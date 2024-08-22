import { useEffect, useRef, useMemo } from "react";
import ChatMessage from "./ChatMessage";
import Loader from "./Loader";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

function ChatContainer({ chatHistory, loading }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  useEffect(() => {
    hljs.highlightAll();
  }, [chatHistory]);

  const renderedChatHistory = useMemo(
    () =>
      chatHistory.map((message, index) => (
        <ChatMessage key={index} message={message} />
      )),
    [chatHistory]
  );

  return (
    <div
      className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg text-white relative"
      ref={chatContainerRef}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <h1 className="fixed text-5xl md:text-9xl font-extrabold text-white tracking-widest">
          MONDAY AI
        </h1>
      </div>
      <div className="space-y-4 mb-10">
        {renderedChatHistory}
        {loading && (
          <div className="flex justify-start">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
