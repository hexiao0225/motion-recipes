"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function FocusRing() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-gray-500 mb-2">
        Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> to see focus rings
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {/* Standard focus ring */}
        <button
          className={`
            px-4 py-2 rounded-lg border border-gray-300 bg-white
            focus:outline-none
            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            ${reducedMotion ? "" : "transition-shadow duration-150"}
          `}
        >
          Standard
        </button>

        {/* Thick focus ring */}
        <button
          className={`
            px-4 py-2 rounded-lg border border-gray-300 bg-white
            focus:outline-none
            focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1
            ${reducedMotion ? "" : "transition-shadow duration-150"}
          `}
        >
          Thick Ring
        </button>

        {/* Inset focus ring */}
        <button
          className={`
            px-4 py-2 rounded-lg border-2 border-gray-300 bg-white
            focus:outline-none
            focus-visible:border-blue-500 focus-visible:ring-0
            ${reducedMotion ? "" : "transition-colors duration-150"}
          `}
        >
          Inset Border
        </button>
      </div>

      {/* Input example */}
      <input
        type="text"
        placeholder="Focus this input..."
        className={`
          mt-2 px-4 py-2 w-56 rounded-lg border border-gray-300
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          focus-visible:border-blue-500
          ${reducedMotion ? "" : "transition-all duration-150"}
        `}
      />
    </div>
  );
}
