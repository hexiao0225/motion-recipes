"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export function TabsIndicator() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("overview");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeButton = tabRefs.current.get(activeTab);
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  // Handle initial position
  useEffect(() => {
    const firstButton = tabRefs.current.get("overview");
    if (firstButton) {
      const { offsetLeft, offsetWidth } = firstButton;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, []);

  return (
    <div className="w-full max-w-md">
      {/* Tab list */}
      <div
        role="tablist"
        className="relative flex border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium
              focus:outline-none focus-visible:bg-gray-100 focus-visible:rounded
              transition-colors duration-150
              ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.label}
          </button>
        ))}

        {/* Sliding indicator */}
        <div
          className={`
            absolute bottom-0 h-0.5 bg-blue-600
            ${reducedMotion ? "" : "transition-all duration-300 ease-out"}
          `}
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>

      {/* Tab panels */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={activeTab !== tab.id}
            className="text-sm text-gray-600"
          >
            <p>
              Content for <strong>{tab.label}</strong> tab. The indicator slides
              smoothly to follow the active tab.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
