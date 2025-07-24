"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setText(""); // clear previous text
    setIsLoading(true);

    const response = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({
        prompt:
          "What is the programming language most used by devs for web development?",
      }),
    });
    const data = await response.json();
    setText(data.text);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Text</h1>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Response"}
      </button>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {text}
      </div>
    </div>
  );
}
