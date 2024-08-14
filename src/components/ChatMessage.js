import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function ChatMessage({ message }) {
  const isCodeSnippet = (text) => text.includes("```");

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

  const formatTextWithHeadings = (text) => {
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
  };

  if (isCodeSnippet(message.text)) {
    const codeContent = message.text.replace(/```/g, "").trim();
    return (
      <div
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
}

export default ChatMessage;
