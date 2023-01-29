import React, { useState } from "react";

export default function Dashboard() {
  const [debug, setDebug] = useState("");

  const [brokenCode, setBrokenCode] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(completedCode);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnDebug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brokenCode
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setDebug(data.answer);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="flex flex-col">
              <p>My Code </p>
              <label htmlFor="brokenCode" className="sr-only">
                Paste Your Code Here
              </label>
              <textarea
                rows={7}
                value={brokenCode}
                onChange={(e) => setBrokenCode(e.target.value)}
                name="brokenCode"
                id="brokenCode"
                placeholder="Paste your broken code here"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${isGenerating
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Debug Overview"}
            </button>

          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                debug === ""
                  ? 7
                  : 100
              }
              name="output"
              value={debug}
              onChange={(e) => setDebug(e.target.value)}
              disabled={debug === ""}
              id="output"
              placeholder="AI Response"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={debug === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
