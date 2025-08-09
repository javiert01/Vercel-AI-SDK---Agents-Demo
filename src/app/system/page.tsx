"use client";
import { useState } from "react";
import { exampleText } from "./utils";

export default function SystemPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setText(""); // clear previous text
    setIsLoading(true);

    const response = await fetch("/api/system-prompt", {
      method: "POST",
      body: JSON.stringify({
        prompt: exampleText,
      }),
    });
    const data = await response.json();
    setText(data.text);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">System Prompts</h1>
      <ul className="mb-4 border rounded  p-3 text-sm text-white font-mono list-disc pl-5">
        <li>You are a text summarizer.</li>
        <li>Summarize the text you receive.</li>
        <li>Be concise.</li>
        <li>Return only the summary.</li>
        <li>Do not use the phrase "here is a summary".</li>
        <li>Highlight relevant phrases in bold.</li>
        <li>The summary should be two sentences long.</li>
      </ul>

      <div className="mb-2 font-semibold text-white">Text to resume:</div>
      <div className="mb-4 border rounded bg-gray-50 p-3 text-sm text-gray-800 max-h-40 overflow-auto font-mono">
        {exampleText}
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Resume"}
      </button>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {text}
      </div>
    </div>
  );
}
