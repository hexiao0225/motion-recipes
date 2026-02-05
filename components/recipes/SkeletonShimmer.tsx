"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function SkeletonShimmer() {
  const reducedMotion = useReducedMotion();

  const shimmerClass = reducedMotion
    ? "bg-gray-200"
    : `
        bg-gray-200 relative overflow-hidden
        before:absolute before:inset-0
        before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent
        before:animate-shimmer
      `;

  return (
    <div className="w-full max-w-sm">
      {/* Card skeleton */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        {/* Avatar + name row */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${shimmerClass}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 w-24 rounded ${shimmerClass}`} />
            <div className={`h-3 w-16 rounded ${shimmerClass}`} />
          </div>
        </div>

        {/* Content lines */}
        <div className="mt-4 space-y-2">
          <div className={`h-3 w-full rounded ${shimmerClass}`} />
          <div className={`h-3 w-full rounded ${shimmerClass}`} />
          <div className={`h-3 w-3/4 rounded ${shimmerClass}`} />
        </div>

        {/* Image placeholder */}
        <div className={`mt-4 h-32 w-full rounded-lg ${shimmerClass}`} />

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <div className={`h-8 w-16 rounded ${shimmerClass}`} />
          <div className={`h-8 w-16 rounded ${shimmerClass}`} />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500 text-center">
        {reducedMotion ? "Static skeleton (reduced motion)" : "Shimmer indicates loading state"}
      </p>
    </div>
  );
}
