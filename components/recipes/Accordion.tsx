"use client";

import { useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const items = [
  {
    id: 1,
    title: "What makes this accordion special?",
    content:
      "This accordion uses CSS Grid's grid-template-rows: 0fr → 1fr trick for smooth height animation. No JavaScript measurement needed!",
  },
  {
    id: 2,
    title: "How does the height animation work?",
    content:
      "The content wrapper has overflow: hidden and min-height: 0. When the parent grid row is 0fr, the content collapses. When it's 1fr, it expands to natural height. CSS handles the transition smoothly.",
  },
  {
    id: 3,
    title: "Is this accessible?",
    content:
      "Yes! Proper ARIA attributes (aria-expanded, aria-controls) are used. The chevron rotation provides visual feedback, and focus states are clear.",
  },
];

export function Accordion() {
  const reducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-md">
      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                className="
                  w-full px-4 py-3 flex items-center justify-between
                  text-left text-sm font-medium text-gray-900
                  hover:bg-gray-50
                  focus:outline-none focus-visible:bg-gray-100
                "
              >
                <span>{item.title}</span>
                <svg
                  className={`
                    w-5 h-5 text-gray-500 flex-shrink-0
                    ${reducedMotion ? "" : "transition-transform duration-300"}
                    ${isOpen ? "rotate-180" : ""}
                  `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Animated content container using CSS Grid */}
              <div
                id={`accordion-content-${item.id}`}
                className={`
                  grid
                  ${
                    reducedMotion
                      ? ""
                      : "transition-[grid-template-rows] duration-300 ease-out"
                  }
                  ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
