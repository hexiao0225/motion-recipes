"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type MotionContextType = {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  // 'system' means we're respecting OS preference
  // 'user' means user explicitly toggled
  source: "system" | "user";
};

const MotionContext = createContext<MotionContextType | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [userPreference, setUserPreference] = useState<boolean | null>(null);
  const [systemPreference, setSystemPreference] = useState(false);

  // Listen to OS prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemPreference(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // User toggle overrides system preference
  const reducedMotion = userPreference ?? systemPreference;
  const source = userPreference !== null ? "user" : "system";

  const toggleReducedMotion = () => {
    setUserPreference((prev) => {
      if (prev === null) {
        // First toggle: invert system preference
        return !systemPreference;
      }
      return !prev;
    });
  };

  return (
    <MotionContext.Provider
      value={{ reducedMotion, toggleReducedMotion, source }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
