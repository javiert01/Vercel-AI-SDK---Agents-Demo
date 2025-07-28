"use client";

import { useState } from "react";
import { userSchema } from "../api/generate-users/route";
import { z } from "zod";

type User = z.infer<typeof userSchema>;

export default function EnumsPage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setUsers([]); // clear previous users
    setIsLoading(true);

    const response = await fetch("/api/generate-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Generate a list of users with names from Ecuador",
      }),
    });
    if (!response.ok) {
      console.error("Failed to generate users");
      setIsLoading(false);
      return;
    }
    const data = await response.json();
    setUsers(data.result as Array<User>);
    setIsLoading(false);
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Users (array)</h1>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Users"}
      </button>
      <div className="mt-4 whitespace-pre-wrap font-mono border p-4 rounded bg-gray-100 text-gray-800">
        {users.map((user, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Age:</strong> {user.age}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
