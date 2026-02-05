import { ComponentType } from "react";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  notes: string[];
  code: string;
  component: ComponentType;
};

// Lazy import components to avoid circular deps
// Components will be added as we implement them
import { ButtonPress } from "@/components/recipes/ButtonPress";
import { FocusRing } from "@/components/recipes/FocusRing";
import { ToastDemo } from "@/components/recipes/ToastDemo";
import { SkeletonShimmer } from "@/components/recipes/SkeletonShimmer";
import { Accordion } from "@/components/recipes/Accordion";
import { Drawer } from "@/components/recipes/Drawer";
import { Tooltip } from "@/components/recipes/Tooltip";
import { TabsIndicator } from "@/components/recipes/TabsIndicator";
import { ListReorder } from "@/components/recipes/ListReorder";
import { SuccessCheck } from "@/components/recipes/SuccessCheck";

export const recipes: Recipe[] = [
  {
    id: "button-press",
    title: "Button Press & Hover",
    description:
      "Subtle scale and shadow changes that make buttons feel responsive and tactile.",
    notes: [
      "Use transform: scale() for press effect — never width/height",
      "Shadow transitions add depth without layout shift",
      "translateY on hover creates a 'lift' effect",
      "Keep transitions under 150ms for instant feedback",
    ],
    code: `<button className="
  px-4 py-2 bg-blue-600 text-white rounded-lg
  transition-all duration-150 ease-out
  hover:-translate-y-0.5 hover:shadow-lg
  active:translate-y-0 active:scale-[0.98] active:shadow-md
">
  Click me
</button>`,
    component: ButtonPress,
  },
  {
    id: "focus-ring",
    title: "Focus Ring & Transition",
    description:
      "Clean, accessible focus indicators that appear on keyboard navigation only.",
    notes: [
      "Use :focus-visible, not :focus, to hide ring on mouse click",
      "ring-offset creates breathing room between element and ring",
      "Animate ring with scale for a subtle 'pop' effect",
      "High contrast ring color (blue-500) ensures visibility",
    ],
    code: `<button className="
  px-4 py-2 rounded-lg border border-gray-300
  focus:outline-none
  focus-visible:ring-2 focus-visible:ring-blue-500
  focus-visible:ring-offset-2
  transition-shadow duration-150
">
  Tab to focus
</button>`,
    component: FocusRing,
  },
  {
    id: "toast",
    title: "Toast Enter/Exit",
    description:
      "Notification toasts that slide in and fade out smoothly, with reduced motion support.",
    notes: [
      "Use translateY + opacity for enter animation",
      "Exit animation uses forwards fill-mode to hold final state",
      "role='status' and aria-live='polite' for screen readers",
      "Reduced motion: instant appear/disappear, no slide",
    ],
    code: `// Toast with CSS animation
<div
  role="status"
  aria-live="polite"
  className={cn(
    "fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg",
    "bg-gray-900 text-white",
    isExiting
      ? "animate-fade-out-up"
      : "animate-fade-in-up",
    "motion-reduce:animate-none"
  )}
>
  {message}
</div>`,
    component: ToastDemo,
  },
  {
    id: "skeleton",
    title: "Skeleton Shimmer",
    description:
      "Loading placeholder with a subtle shimmer effect that isn't distracting.",
    notes: [
      "Shimmer uses translateX on a pseudo-element, not background-position",
      "Low contrast gradient (gray-200 to gray-100) keeps it calm",
      "animation-duration of 1.5s+ prevents frantic movement",
      "Reduced motion: static gray, no shimmer",
    ],
    code: `<div className="
  relative overflow-hidden
  h-4 w-48 rounded bg-gray-200
  motion-safe:before:absolute
  motion-safe:before:inset-0
  motion-safe:before:bg-gradient-to-r
  motion-safe:before:from-transparent
  motion-safe:before:via-gray-100
  motion-safe:before:to-transparent
  motion-safe:before:animate-shimmer
"/>`,
    component: SkeletonShimmer,
  },
  {
    id: "accordion",
    title: "Accordion Expand/Collapse",
    description:
      "Smooth height animation using CSS Grid, no JavaScript measurement needed.",
    notes: [
      "grid-template-rows: 0fr → 1fr animates height naturally",
      "Inner content uses min-height: 0 to allow shrinking",
      "No JS height measurement = no layout thrashing",
      "Chevron rotation adds visual feedback",
    ],
    code: `// Container with CSS Grid height animation
<div className={cn(
  "grid transition-[grid-template-rows] duration-300",
  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
)}>
  <div className="overflow-hidden min-h-0">
    {content}
  </div>
</div>`,
    component: Accordion,
  },
  {
    id: "drawer",
    title: "Drawer / Slide-over Panel",
    description:
      "Side panel with overlay, focus trapping, and keyboard dismissal.",
    notes: [
      "translateX(100%) → translateX(0) for slide animation",
      "Overlay fades in with opacity transition",
      "Focus trap: first focusable element on open, return on close",
      "ESC key closes; click outside closes",
    ],
    code: `// Drawer panel
<div className={cn(
  "fixed inset-y-0 right-0 w-80 bg-white shadow-xl",
  "transform transition-transform duration-300",
  isOpen ? "translate-x-0" : "translate-x-full"
)}>
  {content}
</div>

// Overlay
<div className={cn(
  "fixed inset-0 bg-black/50",
  "transition-opacity duration-300",
  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
)}/>`,
    component: Drawer,
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description:
      "Delayed tooltip that appears on hover and focus, with keyboard accessibility.",
    notes: [
      "150ms delay prevents flicker on accidental hover",
      "opacity + scale(0.95→1) for subtle pop-in",
      "aria-describedby links trigger to tooltip content",
      "Show on :focus-visible for keyboard users",
    ],
    code: `<div className="relative group">
  <button
    aria-describedby="tooltip-id"
    className="..."
  >
    Hover me
  </button>
  <div
    id="tooltip-id"
    role="tooltip"
    className="
      absolute -top-10 left-1/2 -translate-x-1/2
      opacity-0 scale-95 pointer-events-none
      group-hover:opacity-100 group-hover:scale-100
      group-focus-within:opacity-100 group-focus-within:scale-100
      transition-all duration-150 delay-150
    "
  >
    Tooltip text
  </div>
</div>`,
    component: Tooltip,
  },
  {
    id: "tabs",
    title: "Tabs Indicator Animation",
    description: "Sliding underline that follows the active tab smoothly.",
    notes: [
      "Indicator position calculated from active tab's offsetLeft",
      "transform: translateX() moves indicator without layout",
      "Width matches tab width for proper alignment",
      "CSS transition handles the smooth slide",
    ],
    code: `// Indicator element
<div
  className="
    absolute bottom-0 h-0.5 bg-blue-600
    transition-all duration-300 ease-out
  "
  style={{
    left: tabs[activeIndex].offsetLeft,
    width: tabs[activeIndex].offsetWidth,
  }}
/>`,
    component: TabsIndicator,
  },
  {
    id: "list-reorder",
    title: "List Item Reorder",
    description:
      "CSS-based position swap animation using View Transitions or transforms.",
    notes: [
      "Items use order property for logical position",
      "CSS transitions animate transform when order changes",
      "No FLIP library needed for simple reorders",
      "Reduced motion: instant swap, no animation",
    ],
    code: `// List with animated reorder
<ul className="space-y-2">
  {items.map((item, index) => (
    <li
      key={item.id}
      style={{ order: index }}
      className="
        transition-transform duration-300
        motion-reduce:transition-none
      "
    >
      {item.content}
    </li>
  ))}
</ul>`,
    component: ListReorder,
  },
  {
    id: "success-check",
    title: "Success Check Animation",
    description:
      "Checkmark draw animation for confirmation feedback, using SVG stroke.",
    notes: [
      "stroke-dasharray + stroke-dashoffset creates draw effect",
      "Animate dashoffset from path length to 0",
      "Circle scales in before check draws",
      "Reduced motion: instant check, no draw",
    ],
    code: `<svg className="w-12 h-12" viewBox="0 0 24 24">
  <circle
    cx="12" cy="12" r="10"
    className="
      fill-green-100 stroke-green-500
      origin-center animate-scale-in
    "
  />
  <path
    d="M8 12l3 3 5-6"
    className="
      stroke-green-600 stroke-2 fill-none
      [stroke-dasharray:24] [stroke-dashoffset:24]
      animate-draw-check
    "
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>`,
    component: SuccessCheck,
  },
];
