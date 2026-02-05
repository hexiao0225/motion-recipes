"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Drawer() {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus close button when drawer opens
      closeButtonRef.current?.focus();
    } else {
      // Return focus to trigger when drawer closes
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Trap focus inside drawer
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    },
    []
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="
          px-4 py-2 bg-gray-900 text-white rounded-lg
          hover:bg-gray-800
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
          transition-colors duration-150
        "
      >
        Open Drawer
      </button>

      {/* Portal-like container for demo (in real app, use portal) */}
      {(isOpen || !reducedMotion) && (
        <div
          className={`
            fixed inset-0 z-50
            ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
          `}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className={`
              absolute inset-0 bg-black/50
              ${reducedMotion ? "" : "transition-opacity duration-300"}
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Drawer panel"
            onKeyDown={handleKeyDown}
            className={`
              absolute inset-y-0 right-0 w-80 max-w-full
              bg-white shadow-xl
              ${
                reducedMotion
                  ? isOpen
                    ? "translate-x-0"
                    : "translate-x-full"
                  : "transition-transform duration-300 ease-out"
              }
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Drawer Title</h2>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="
                  p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                "
                aria-label="Close drawer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-600">
                This drawer slides in from the right. It traps focus, closes on
                ESC, and returns focus to the trigger button when closed.
              </p>

              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Tab to this input..."
                  className="
                    w-full px-3 py-2 border border-gray-300 rounded-lg
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  "
                />
                <button
                  className="
                    w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  "
                >
                  Action Button
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Press ESC or click overlay to close
      </p>
    </div>
  );
}
