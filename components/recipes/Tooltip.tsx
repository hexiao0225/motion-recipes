"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function Tooltip() {
  const reducedMotion = useReducedMotion();

  const tooltipTransition = reducedMotion
    ? ""
    : "transition-all duration-150 delay-150";

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-gray-500">
        Hover or focus the buttons to see tooltips
      </p>

      <div className="flex gap-6 flex-wrap justify-center">
        {/* Top tooltip */}
        <div className="relative group">
          <button
            aria-describedby="tooltip-top"
            className="
              px-4 py-2 bg-gray-100 rounded-lg
              hover:bg-gray-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              transition-colors duration-150
            "
          >
            Top
          </button>
          <div
            id="tooltip-top"
            role="tooltip"
            className={`
              absolute left-1/2 -translate-x-1/2 bottom-full mb-2
              px-2 py-1 text-xs text-white bg-gray-900 rounded
              whitespace-nowrap
              opacity-0 scale-95 pointer-events-none
              group-hover:opacity-100 group-hover:scale-100
              group-focus-within:opacity-100 group-focus-within:scale-100
              ${tooltipTransition}
            `}
          >
            Tooltip on top
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>

        {/* Right tooltip */}
        <div className="relative group">
          <button
            aria-describedby="tooltip-right"
            className="
              px-4 py-2 bg-gray-100 rounded-lg
              hover:bg-gray-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              transition-colors duration-150
            "
          >
            Right
          </button>
          <div
            id="tooltip-right"
            role="tooltip"
            className={`
              absolute left-full ml-2 top-1/2 -translate-y-1/2
              px-2 py-1 text-xs text-white bg-gray-900 rounded
              whitespace-nowrap
              opacity-0 scale-95 pointer-events-none
              group-hover:opacity-100 group-hover:scale-100
              group-focus-within:opacity-100 group-focus-within:scale-100
              ${tooltipTransition}
            `}
          >
            Tooltip on right
            {/* Arrow */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-gray-900" />
          </div>
        </div>

        {/* Bottom tooltip */}
        <div className="relative group">
          <button
            aria-describedby="tooltip-bottom"
            className="
              px-4 py-2 bg-gray-100 rounded-lg
              hover:bg-gray-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              transition-colors duration-150
            "
          >
            Bottom
          </button>
          <div
            id="tooltip-bottom"
            role="tooltip"
            className={`
              absolute left-1/2 -translate-x-1/2 top-full mt-2
              px-2 py-1 text-xs text-white bg-gray-900 rounded
              whitespace-nowrap
              opacity-0 scale-95 pointer-events-none
              group-hover:opacity-100 group-hover:scale-100
              group-focus-within:opacity-100 group-focus-within:scale-100
              ${tooltipTransition}
            `}
          >
            Tooltip on bottom
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-4 border-transparent border-b-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
