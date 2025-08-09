"use client";

import { useState } from "react";

export default function EnumsPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function handleClick() {
    setText(""); // clear previous text
    setIsLoading(true);

    const response = await fetch("/api/classify-sentiment", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
    });
    if (!response.ok) {
      setIsLoading(false);
      setText("Error classifying sentiment.");
      return;
    }
    const data = await response.json();
    setText(data.result);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sentiment Classification</h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter text to classify sentiment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleClick}
          disabled={isLoading || !prompt.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Classify Sentiment"}
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {text}
      </div>
    </div>
  );
}
