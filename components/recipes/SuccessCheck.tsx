"use client";

import { useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SuccessCheck() {
  const reducedMotion = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0);

  const triggerAnimation = () => {
    setIsAnimating(false);
    // Force re-mount to restart animation
    setKey((k) => k + 1);
    // Small delay to ensure re-mount
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={triggerAnimation}
        className="
          px-4 py-2 bg-green-600 text-white rounded-lg
          hover:bg-green-700
          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
          transition-colors duration-150
        "
      >
        Trigger Success
      </button>

      <div className="h-20 flex items-center justify-center">
        {isAnimating && (
          <svg
            key={key}
            className="w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            aria-label="Success"
            role="img"
          >
            {/* Background circle */}
            <circle
              cx="12"
              cy="12"
              r="10"
              className={`
                fill-green-100 stroke-green-500 stroke-2
                ${reducedMotion ? "" : "origin-center animate-scale-in"}
              `}
            />

            {/* Checkmark path */}
            <path
              d="M8 12l3 3 5-6"
              className={`
                stroke-green-600 stroke-2
                ${
                  reducedMotion
                    ? ""
                    : "[stroke-dasharray:24] [stroke-dashoffset:24] animate-draw-check [animation-delay:200ms]"
                }
              `}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}

        {!isAnimating && (
          <div className="text-sm text-gray-400">
            Click button to see animation
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 max-w-xs text-center">
        Circle scales in, then checkmark draws using{" "}
        <code className="px-1 py-0.5 bg-gray-100 rounded">stroke-dashoffset</code>
      </p>
    </div>
  );
}
