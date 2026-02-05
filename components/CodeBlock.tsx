"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <pre className="code-block text-xs overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={`
          absolute top-2 right-2 px-2 py-1 text-xs rounded
          transition-colors duration-150
          ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        `}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
