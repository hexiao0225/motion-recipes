"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function ButtonPress() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {/* Primary button */}
      <button
        className={`
          px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg
          shadow-md
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${
            reducedMotion
              ? ""
              : `
                transition-all duration-150 ease-out
                hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-700
                active:translate-y-0 active:scale-[0.98] active:shadow-md
              `
          }
        `}
      >
        Primary
      </button>

      {/* Secondary button */}
      <button
        className={`
          px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg
          border border-gray-300 shadow-sm
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${
            reducedMotion
              ? "hover:bg-gray-50"
              : `
                transition-all duration-150 ease-out
                hover:-translate-y-0.5 hover:shadow-md hover:border-gray-400
                active:translate-y-0 active:scale-[0.98] active:shadow-sm
              `
          }
        `}
      >
        Secondary
      </button>

      {/* Ghost button */}
      <button
        className={`
          px-5 py-2.5 text-blue-600 font-medium rounded-lg
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${
            reducedMotion
              ? "hover:bg-blue-50"
              : `
                transition-all duration-150 ease-out
                hover:bg-blue-50
                active:scale-[0.98] active:bg-blue-100
              `
          }
        `}
      >
        Ghost
      </button>
    </div>
  );
}
