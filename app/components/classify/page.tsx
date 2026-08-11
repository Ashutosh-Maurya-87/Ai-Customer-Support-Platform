"use client";

import { FormEvent, useState } from "react";

const TicketChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    category: string;
    priority: string;
    sentiment: string;
    needsHuman: boolean;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    const data = await res.json();

    setResult(data);
    setInput("");
  };

  console.log("result", result);

  return (
    <>
      <div>
        {result && (
          <div>
            <p>Category: {result.category}</p>
            <p>Priority: {result.priority}</p>
            <p>Sentiment: {result.sentiment}</p>
            <p>Needs Human: {result.needsHuman ? "Yes" : "No"}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write the query"
        />

        <button type="submit">Analyze</button>
      </form>
    </>
  );
};

export default TicketChecker;