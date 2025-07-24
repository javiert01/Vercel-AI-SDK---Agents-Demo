"use client";
import { useState } from "react";

export default function StreamPage() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  async function handleClick() {
    setText(""); // clear previous text
    setIsStreaming(true);

    const response = await fetch("/api/ask-stream", {
      method: "POST",
      body: JSON.stringify({ prompt: "Tell me a story about streaming text" }),
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      setText((prev) => prev + decoder.decode(value));
    }

    setIsStreaming(false);
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isStreaming}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isStreaming ? "Streaming..." : "Start Stream"}
      </button>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {text}
      </div>
    </>
  );
}
