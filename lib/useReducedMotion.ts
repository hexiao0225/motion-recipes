"use client";

import { useMotion } from "@/context/MotionContext";

/**
 * Simple hook to check if reduced motion is active.
 * Combines user preference (toggle) with OS preference.
 */
export function useReducedMotion(): boolean {
  const { reducedMotion } = useMotion();
  return reducedMotion;
}
