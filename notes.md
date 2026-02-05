# Motion Recipes — Field Notes

Practical reflections and rules of thumb from building 10 CSS-first microinteractions.

---

## Timing Rules of Thumb

| Animation Type | Duration | Why |
|----------------|----------|-----|
| Button press/hover | 100-150ms | Needs to feel instant, like physical feedback |
| Focus ring appear | 150ms | Fast enough to not delay perception of focus |
| Toast enter/exit | 200ms | Balanced — visible but doesn't block flow |
| Accordion/Drawer | 250-300ms | Larger movements need time to be perceived |
| Page transitions | 300-400ms | Only for meaningful context changes |

**Rule**: If the user is waiting for feedback (button click), go faster. If they're watching content change (drawer), give it breathing room.

---

## The Golden Properties

Only animate these without jank:

```
✅ transform (translate, scale, rotate)
✅ opacity
✅ filter (blur, brightness — GPU accelerated)
✅ clip-path (for reveals, but test on mobile)
```

Never animate these for smooth motion:

```
❌ width / height — triggers layout
❌ top / left / right / bottom — triggers layout
❌ margin / padding — triggers layout
❌ border-width — triggers layout
❌ font-size — triggers layout + paint
```

---

## The Grid Height Trick

Before this technique, animating height required:
1. Measure element with JS
2. Set explicit height
3. Animate to new height
4. Remove explicit height

Now with CSS Grid:

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr; /* collapsed */
  transition: grid-template-rows 300ms;
}

.accordion-content.open {
  grid-template-rows: 1fr; /* expanded to natural height */
}

.accordion-content > div {
  overflow: hidden;
  min-height: 0; /* allows shrinking below content height */
}
```

**Why it works**: `1fr` means "1 fraction of available space" which equals the content's natural height. CSS interpolates between `0fr` and `1fr` smoothly.

---

## Focus Management Checklist

For any modal/drawer/overlay:

- [ ] Move focus to first focusable element on open
- [ ] Trap Tab/Shift+Tab inside (focus loops)
- [ ] Close on ESC key
- [ ] Return focus to trigger element on close
- [ ] `aria-modal="true"` on the dialog
- [ ] Hide background content from screen readers (`aria-hidden` on siblings)

**The return focus part is often forgotten** — without it, keyboard users get lost.

---

## Reduced Motion: Do This, Not That

```tsx
// ❌ Don't just disable everything
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}

// ✅ Do provide meaningful alternatives
@media (prefers-reduced-motion: reduce) {
  .toast {
    /* Still show/hide, just instantly */
    animation: none;
    transition: opacity 0ms;
  }
}
```

Reduced motion doesn't mean "no motion" — it means "no vestibular-triggering motion". Fades and instant state changes are usually fine.

---

## Tooltip Delay Logic

```
Hover in  → 150ms delay → Show tooltip
Hover out → 0ms delay   → Hide immediately
```

**Why delay on enter?** Prevents tooltips from flashing as mouse moves across UI. Users moving quickly don't trigger them.

**Why no delay on exit?** Once you move away, the tooltip should vanish immediately — lingering tooltips feel broken.

---

## Focus-Visible vs Focus

```css
/* Shows ring on every focus (mouse + keyboard) */
button:focus {
  outline: 2px solid blue;
}

/* Shows ring only on keyboard focus */
button:focus-visible {
  outline: 2px solid blue;
}
button:focus:not(:focus-visible) {
  outline: none; /* hide on mouse click */
}
```

**Always use `:focus-visible`** for visual rings. The old `:focus` approach creates ugly rings on every click.

---

## will-change: Use Sparingly

```css
/* ✅ Good: applied to long-running animation */
.shimmer-element {
  will-change: transform;
}

/* ❌ Bad: applied to everything "just in case" */
* {
  will-change: transform, opacity;
}
```

`will-change` tells the browser to optimize for upcoming animations, but:
- Creates new compositor layers (memory cost)
- Applied everywhere = no optimization benefit
- Remove after animation completes for one-shots

---

## Stroke Dashoffset for Draw Effects

The checkmark animation uses this SVG trick:

```css
path {
  stroke-dasharray: 24;   /* total path length */
  stroke-dashoffset: 24;  /* hide entire path */
  animation: draw 0.3s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0; /* reveal entire path */
  }
}
```

**How to get path length**: In browser devtools, select the path and run:
```js
document.querySelector('path').getTotalLength()
```

---

## CSS Transition vs Animation

| Use transition when... | Use animation when... |
|------------------------|----------------------|
| State change (hover, open/close) | Continuous/looping (shimmer, spinner) |
| A → B only | Multi-step (A → B → C) |
| User-triggered | Auto-playing |

```css
/* Transition: state-driven */
.button {
  transition: transform 150ms;
}
.button:hover {
  transform: translateY(-2px);
}

/* Animation: autonomous */
.shimmer {
  animation: shimmer 1.5s infinite;
}
```

---

## Testing Checklist for Each Recipe

- [ ] Hover states work (mouse)
- [ ] Keyboard navigation works (Tab, Enter/Space)
- [ ] Focus ring appears on keyboard focus
- [ ] Toggle reduced motion in OS → animation stops
- [ ] Toggle reduced motion in UI → animation stops
- [ ] Test on mobile (touch, no hover)
- [ ] Lighthouse accessibility audit passes
- [ ] Screen reader announces relevant changes

---

## Quotes to Remember

> "Animation should be felt, not seen."

> "If the user notices your transition, it's probably too slow."

> "The best animation is the one you don't consciously register, but would miss if it were gone."

---

## Resources

- [Animations and performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate)
- [prefers-reduced-motion - web.dev](https://web.dev/prefers-reduced-motion/)
- [CSS Grid height trick - CSS-Tricks](https://css-tricks.com/css-grid-and-custom-shapes-part-2/)
- [Focus-visible polyfill](https://github.com/WICG/focus-visible) (if supporting old browsers)
