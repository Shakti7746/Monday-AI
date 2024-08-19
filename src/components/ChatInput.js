import React from "react";

function ChatInput({ prompt, setPrompt, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-4 bg-gradient-to-r from-blue-500 to-teal-400 flex items-center rounded-lg"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type a message..."
        className="bg-white rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16" // Added padding-right to make space for the button
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
