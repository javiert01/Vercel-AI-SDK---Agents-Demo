"use client";
import { type CoreMessage } from "ai";
import { format } from "path";
import { useState } from "react";
import { formatMessage } from "./utils";

export default function HistoryPage() {
  const [messages, setMessages] = useState<CoreMessage[]>([
    {
      role: "user",
      content: "What is the weather like today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchHistory() {
    setIsLoading(true);
    const response = await fetch("/api/message-history", {
      method: "POST",
      body: JSON.stringify(messages),
    });
    const data = await response.json();
    const allMessages: CoreMessage[] = [...messages, ...data.messages];
    setMessages(allMessages);
    setIsLoading(false);
  }
  console.log("Messages:", messages);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Message Histories</h1>
      <button
        onClick={handleFetchHistory}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Fetch Message History"}
      </button>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>{msg.role}:</strong>
              {formatMessage(msg)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
