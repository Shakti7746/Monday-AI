import { useEffect, useRef, useMemo,} from "react";
import ChatMessage from "./ChatMessage";
import Loader from "./Loader";
import hljs from "highlight.js"; // Import highlight.js
import "highlight.js/styles/github.css"; // Import a highlight.js theme

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
      className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg"
      ref={chatContainerRef}
    >
      <div className="space-y-4">
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
