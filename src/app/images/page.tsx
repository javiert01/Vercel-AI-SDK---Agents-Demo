"use client";

import { useState } from "react";

export default function ImagesPage() {
  const [imageDescription, setImageDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/V%C3%B3lcan_Cotopaxi.jpg/330px-V%C3%B3lcan_Cotopaxi.jpg"
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setImageDescription(""); // clear previous text
    setIsLoading(true);
    const response = await fetch("/api/describe-image", {
      method: "POST",
      body: JSON.stringify({
        imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setImageDescription(data.text);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Image Description</h1>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Image Description"}
      </button>
      <div className="flex flex-col items-center mt-8">
        <img
          src={imageUrl}
          alt="Selected"
          className="rounded-lg shadow-lg max-w-full h-64 object-cover mb-4 border border-gray-200"
        />
        <p className="mt-4 text-white text-center min-h-[2rem]">
          {imageDescription ? imageDescription : "No description yet."}
        </p>
      </div>
    </div>
  );
}
