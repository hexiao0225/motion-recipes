"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Toast = {
  id: number;
  message: string;
  isExiting: boolean;
};

export function ToastDemo() {
  const reducedMotion = useReducedMotion();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [counter, setCounter] = useState(0);

  const addToast = useCallback(() => {
    const id = counter;
    setCounter((c) => c + 1);
    setToasts((prev) => [
      ...prev,
      { id, message: `Toast notification #${id + 1}`, isExiting: false },
    ]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
      );
      // Remove from DOM after exit animation
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, reducedMotion ? 0 : 200);
    }, 3000);
  }, [counter, reducedMotion]);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={addToast}
        className="
          px-4 py-2 bg-gray-900 text-white rounded-lg
          hover:bg-gray-800
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
          transition-colors duration-150
        "
      >
        Show Toast
      </button>

      <p className="text-xs text-gray-500">
        Toast auto-dismisses after 3 seconds
      </p>

      {/* Toast container - positioned relative to preview area */}
      <div className="relative w-full h-24">
        <div className="absolute bottom-0 right-0 flex flex-col gap-2">
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              role="status"
              aria-live="polite"
              className={`
                px-4 py-3 rounded-lg shadow-lg
                bg-gray-900 text-white text-sm
                ${
                  reducedMotion
                    ? toast.isExiting
                      ? "opacity-0"
                      : "opacity-100"
                    : toast.isExiting
                    ? "animate-fade-out-up"
                    : "animate-fade-in-up"
                }
              `}
            >
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
