"use client";
import { useState } from "react";

export default function StreamPage() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function handleClick() {
    setText(""); // clear previous text
    setIsStreaming(true);

    const response = await fetch("/api/ask-stream", {
      method: "POST",
      body: JSON.stringify({ prompt }),
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stream Text</h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleClick}
          disabled={isStreaming || !prompt.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          {isStreaming ? "Streaming..." : "Start Stream"}
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800 min-h-[3rem]">
        {text}
      </div>
    </div>
  );
}
