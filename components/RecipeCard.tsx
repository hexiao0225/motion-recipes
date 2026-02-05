"use client";

import { useState } from "react";
import { Recipe } from "@/lib/recipes";
import { CodeBlock } from "./CodeBlock";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [showCode, setShowCode] = useState(false);
  const Component = recipe.component;

  return (
    <article className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Preview area */}
      <div className="p-6 min-h-[180px] flex items-center justify-center bg-gray-50 border-b border-gray-200">
        <Component />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{recipe.description}</p>

        {/* Implementation notes */}
        <div className="mt-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Implementation Notes
          </h3>
          <ul className="mt-2 space-y-1">
            {recipe.notes.map((note, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start gap-2"
              >
                <span className="text-gray-400 select-none">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code toggle */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowCode(!showCode)}
            className="
              flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700
              focus:outline-none focus-visible:underline
            "
            aria-expanded={showCode}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showCode ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {showCode ? "Hide code" : "View code"}
          </button>

          {showCode && (
            <div className="mt-3">
              <CodeBlock code={recipe.code} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
