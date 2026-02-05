"use client";

import { useMotion } from "@/context/MotionContext";

export function Header() {
  const { reducedMotion, toggleReducedMotion, source } = useMotion();

  return (
    <header className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Motion Recipes
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            10 subtle, accessible microinteractions for modern UIs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm text-gray-600">Reduced motion</span>
            <button
              role="switch"
              aria-checked={reducedMotion}
              onClick={toggleReducedMotion}
              className={`
                relative w-11 h-6 rounded-full transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                ${reducedMotion ? "bg-blue-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                  transition-transform duration-200
                  ${reducedMotion ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </label>
          {source === "system" && (
            <span className="text-xs text-gray-400">(system)</span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 max-w-2xl">
        CSS-first animations with zero dependencies. Each recipe is
        keyboard-accessible, respects{" "}
        <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">
          prefers-reduced-motion
        </code>
        , and avoids animating layout properties.
      </p>
    </header>
  );
}
