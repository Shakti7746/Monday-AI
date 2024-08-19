import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-5 gap-1">
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
