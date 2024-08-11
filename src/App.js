import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  // Access the API key from environment variables
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // hum AI ka model Change kr skte hain...
      const message = await model.generateContent(prompt);
      const responseText = message.response.text();
      setResponse(responseText);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred.");
    }
  };


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
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4 p-4 bg-white shadow-lg">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            className="bg-gray-200 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
