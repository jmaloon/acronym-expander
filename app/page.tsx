"use client";

import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { expansionSchema } from "./api/schema";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const { submit, isLoading, object, stop, error } = useObject({
    api: "/api",
    schema: expansionSchema,
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // handle bad prompt?
    submit(prompt);
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 m-4">
      <h1>Acronym Generator</h1>
      <p>Enter your acronym below and we generate random expansions</p>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={prompt}
          placeholder="Add your acronym here e.g. START"
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading || error != null}
        />
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          An error occurred. {error.message}
        </div>
      )}

      {isLoading && (
        <div className="mt-4 text-gray-500">
          <div>Loading...</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={() => stop()}
          >
            STOP
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {object?.expansions?.map((expansion, index) => (
          <div
            className="flex items-start gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800"
            key={index}
          >
            <div className="flex-1 space-y-1">
              <p className="text-gray-700 dark:text-gray-300">{expansion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
