"use client";

import { useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Item = {
  id: number;
  title: string;
};

const initialItems: Item[] = [
  { id: 1, title: "First item" },
  { id: 2, title: "Second item" },
  { id: 3, title: "Third item" },
  { id: 4, title: "Fourth item" },
];

export function ListReorder() {
  const reducedMotion = useReducedMotion();
  const [items, setItems] = useState(initialItems);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
  };

  const shuffle = () => {
    const newItems = [...items];
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    setItems(newItems);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-end mb-3">
        <button
          onClick={shuffle}
          className="
            px-3 py-1.5 text-sm bg-gray-100 rounded-lg
            hover:bg-gray-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            transition-colors duration-150
          "
        >
          Shuffle
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`
              flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg
              ${
                reducedMotion
                  ? ""
                  : "transition-all duration-300 ease-out"
              }
            `}
            style={{
              // Using CSS custom property for potential FLIP-like effects
              // In this simple version, React handles the DOM order
            }}
          >
            <span className="flex-1 text-sm text-gray-700">{item.title}</span>

            <div className="flex gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="
                  p-1 rounded hover:bg-gray-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-colors duration-150
                "
                aria-label={`Move ${item.title} up`}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="
                  p-1 rounded hover:bg-gray-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-colors duration-150
                "
                aria-label={`Move ${item.title} down`}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
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
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-gray-500 text-center">
        Click arrows to reorder, or shuffle to randomize
      </p>
    </div>
  );
}
