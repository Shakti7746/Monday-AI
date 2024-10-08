import React from "react";
import { BsFillSendFill } from "react-icons/bs";

function ChatInput({ prompt, setPrompt, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-2 md:p-4 bg-gradient-to-r from-blue-500 to-teal-400 flex items-center"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type a message..."
        className="bg-white rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16 text-sm md:text-base"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-2 py-1 md:py-2 px-4 rounded-full hover:bg-gray-400 text-xs md:text-sm"
      >
       <BsFillSendFill />
      </button>
    </form>
  );
}

export default ChatInput;
