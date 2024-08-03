import { useState } from "react";
import "./App.css";

import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const apiKey = "AIzaSyB_Jhb4eApsfYsiAtiVJXgb8srorLMNeQ0"; // Replace with your actual API key

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Replace with desired model
      const message = await model.generateContent(prompt);
      const responseText = message.response.text();
      setResponse(responseText);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-slate-400">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white   
py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-gray-700">{response}</div>
    </div>
  );
}
export default App;
