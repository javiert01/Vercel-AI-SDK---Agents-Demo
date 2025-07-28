"use client";

import { useState } from "react";

export default function ToolCallPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function handleClick() {
    setText(""); // clear previous text
    setIsLoading(true);

    const response = await fetch("/api/tool-call", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Response data:", data);
    setText(data.text);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Tool Call Example (Basic Calculator)
      </h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt, e.g. 'What is 5 + 12.5?'"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleClick}
          disabled={isLoading || !prompt.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Response"}
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {text}
      </div>
    </div>
  );
}
