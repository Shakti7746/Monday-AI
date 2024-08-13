import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "./components/Loader"; // Ensure this path is correct
import "highlight.js/styles/github.css"; // Import a highlight.js theme
import hljs from "highlight.js"; // Import highlight.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // State to store chat history
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null); // Ref to the chat container

  // Access the API key from environment variables
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // Combine chat history into a single string to send to the API
  const generateConversationContext = (chatHistory) => {
    return chatHistory
      .map((message) =>
        message.type === "prompt"
          ? `User: ${message.text}`
          : `Assistant: ${message.text}`
      )
      .join("\n");
  };

  // Function to clean the response text by removing unwanted substrings(chat coherence ko thik krne ke liye generateConversationContext(updatedChatHistory); ka use kiya jisme by default ek response aa rha tha Assistant name ka usko htane ke liye ye function hai)
  const cleanResponseText = (text) => {
    return text.replace(/Assistant:\s*/g, "").trim();
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true); // Start loading when the request starts

      // Add the prompt to the chat history
      const updatedChatHistory = [
        ...chatHistory,
        { type: "prompt", text: prompt },
      ];
      setChatHistory(updatedChatHistory);
      setPrompt(""); // Clear the input field after submitting

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate context with the chat history
        const conversationContext =
          generateConversationContext(updatedChatHistory);
        const message = await model.generateContent(conversationContext);
        let responseText = message.response.text();

        // Clean the response text to remove unwanted substrings(Ai ke response me ek prefix aa rha tha Assistant Name ka usko htane ke liye)
        responseText = cleanResponseText(responseText);

        // Add the response to the chat history
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "response", text: responseText },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "response", text: "An error occurred." },
        ]);
      } finally {
        setLoading(false); // Stop loading once the request completes
      }
    },
    [prompt, chatHistory, apiKey]
  );

  // Scroll to the bottom whenever chat history updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  // Highlight code snippets after chat history updates
  useEffect(() => {
    hljs.highlightAll();
  }, [chatHistory]);

  // Function to check if the message contains code
  const isCodeSnippet = useCallback((text) => {
    return text.includes("```");
  }, []);

  // Function to handle copying code to clipboard
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  // Function to format the response text with headings(===> Preventing Unnecessary Re-Renders: When passing callbacks to child components, if the function reference changes on every render, it can trigger unnecessary re-renders of the child component. Memoizing with useCallback ensures that the function reference remains stable as long as dependencies don't change.)
  const formatTextWithHeadings = useCallback((text) => {
    // Convert Markdown-like headings to HTML
    return text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <h3 key={index} className="text-xl font-bold">
            {line.substring(2, line.length - 2).trim()}
          </h3>
        );
      if (line.startsWith("*") && line.endsWith("*"))
        return (
          <h4 key={index} className="text-lg font-bold">
            {line.substring(1, line.length - 1).trim()}
          </h4>
        );
      if (line.startsWith("* **") && line.endsWith("**"))
        return (
          <h3 key={index} className="font-bold">
            {line.substring(4, line.length - 2).trim()}
          </h3>
        );
      return <p key={index}>{line}</p>;
    });
  }, []);

  // Function to render chat messages
  const renderMessage = useCallback(
    (message, index) => {
      if (isCodeSnippet(message.text)) {
        const codeContent = message.text.replace(/```/g, "").trim(); // Remove the backticks
        return (
          <div
            key={index}
            className={`flex ${
              message.type === "prompt" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative bg-gray-900 text-white p-4 rounded-lg shadow-md max-w-full overflow-x-auto">
              <pre>
                <code className="language-javascript">{codeContent}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeContent)}
                className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                style={{ fontSize: "1.2rem" }} // Increase button size
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className={`flex ${
              message.type === "prompt" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg shadow-md ${
                message.type === "prompt"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              {formatTextWithHeadings(message.text)}
            </div>
          </div>
        );
      }
    },
    [copyToClipboard, formatTextWithHeadings, isCodeSnippet]
  );

  const renderedChatHistory = useMemo(
    () => chatHistory.map((message, index) => renderMessage(message, index)),
    [chatHistory, renderMessage]
  );

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div
        className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg"
        ref={chatContainerRef} // Attach ref to the chat container
      >
        <div className="space-y-4">
          {/* Render the chat history */}
          {renderedChatHistory}
          {/* Show loader if loading */}
          {loading && (
            <div className="flex justify-start">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-lg border-t border-gray-300 flex items-center"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          className="bg-gray-200 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
