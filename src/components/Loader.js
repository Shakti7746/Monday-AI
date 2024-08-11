import React from "react";

const Loader = () => {
  return (
    <div class="flex items-center justify-center p-5 gap-1 bg-white min-w-screen">
      <span class="sr-only">Loading...</span>
      <div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
