function ChatInput({ prompt, setPrompt, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border-gray-300 flex items-center"
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
        className="bg-blue-400 text-white py-2 px-6 rounded-full hover:bg-blue-700 ml-2"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
