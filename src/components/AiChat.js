import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

function AiChat() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const generateConversationContext = (chatHistory) => {
    return chatHistory
      .map((message) =>
        message.type === "prompt"
          ? `User: ${message.text}`
          : `Assistant: ${message.text}`
      )
      .join("\n");
  };

  const cleanResponseText = (text) => {
    return text.replace(/Assistant:\s*/g, "").trim();
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const updatedChatHistory = [
        ...chatHistory,
        { type: "prompt", text: prompt },
      ];
      setChatHistory(updatedChatHistory);
      setPrompt("");

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const conversationContext =
          generateConversationContext(updatedChatHistory);
        const message = await model.generateContent(conversationContext);
        let responseText = message.response.text();

        responseText = cleanResponseText(responseText);

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
        setLoading(false);
      }
    },
    [prompt, chatHistory, apiKey]
  );

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <ChatContainer chatHistory={chatHistory} loading={loading} />
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AiChat;
