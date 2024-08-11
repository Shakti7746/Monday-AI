import { useState, useEffect, useRef } from "react";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading when the request starts

    // Add the prompt to the chat history
    setChatHistory([...chatHistory, { type: "prompt", text: prompt }]);
    setPrompt(""); // Clear the input field after submitting


    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const message = await model.generateContent(prompt);
      const responseText = message.response.text();

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
  };


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
  const isCodeSnippet = (text) => {
    return text.includes("```");
  };

  // Function to handle copying code to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Function to format the response text with headings
  const formatTextWithHeadings = (text) => {
    // Convert Markdown-like headings to HTML
    return text.split("\n").map((line, index) => {
      if (line.startsWith("# "))
        return (
          <h1 key={index} className="text-2xl font-bold">
            {line.substring(2)}
          </h1>
        );
      if (line.startsWith("## "))
        return (
          <h2 key={index} className="text-xl font-bold">
            {line.substring(3)}
          </h2>
        );
      if (line.startsWith("### "))
        return (
          <h3 key={index} className="text-lg font-bold">
            {line.substring(4)}
          </h3>
        );
      return <p key={index}>{line}</p>;
    });
  };

  // Function to render chat messages
  const renderMessage = (message, index) => {
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


  //added some comments

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex flex-col h-full w-full max-w-full max-h-full">
        <div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md self-end">
                {prompt}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-300 text-gray-900 p-3 rounded-lg shadow-md self-start">
                {response}
              </div>
            </div>

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
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div
        className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg"
        ref={chatContainerRef} // Attach ref to the chat container
      >
        <div className="space-y-4">
          {/* Render the chat history */}
          {chatHistory.map((message, index) => renderMessage(message, index))}
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
        className="p-4 bg-white shadow-lg  flex items-center"
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
