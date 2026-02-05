# Motion Recipes — Video Walkthrough Script

**Estimated length**: 8–10 minutes

---

## Intro (30 seconds)

[SHOW: Browser with motion-recipes.vercel.app open]

> Hey! Today I want to walk you through a project I built called **Motion Recipes** — it's a collection of 10 subtle UI microinteractions that you can use in your own projects.
>
> What makes this special? **Zero animation libraries**. No Framer Motion, no GSAP — just CSS transitions, keyframes, and a tiny bit of JavaScript where absolutely necessary.
>
> The goal was to prove that modern CSS can handle most of the animations you'll ever need, while staying accessible and performant. Let me show you what I mean.

---

## The Reduced Motion Toggle (45 seconds)

[SHOW: Point to the toggle in the header]

> Before we dive in, see this toggle up here? "Reduced motion."
>
> This is **really important**. Some people experience motion sickness or vestibular disorders, and animations can actually make them feel physically uncomfortable. Your operating system has a setting called "prefers reduced motion" that users can turn on.
>
> [CLICK the toggle ON]
>
> When I turn this on, watch what happens to the animations — they either become instant or disappear entirely. No sliding, no bouncing. Just immediate state changes.
>
> [CLICK the toggle OFF]
>
> Every single recipe in this project respects this setting. It's not optional — if you're building animations, you need to handle this.

---

## Recipe 1: Button Press & Hover (45 seconds)

[SHOW: Button Press recipe card]

> Let's start with something you use every day — buttons.
>
> [HOVER over the Primary button]
>
> See that? On hover, the button lifts up slightly and the shadow gets bigger. It feels like it's rising off the page.
>
> [CLICK and hold the button]
>
> And when I press it, it scales down just a tiny bit — like 98% — and the shadow shrinks. It feels *tactile*, like pressing a real button.
>
> [SHOW: Implementation notes]
>
> The key insight here: we're only animating `transform` and `box-shadow`. Never animate `width` or `height` — those trigger expensive layout recalculations. Transform is basically free because it's GPU-accelerated.
>
> Also notice the timing — 150 milliseconds. For micro-interactions like button presses, you want it fast. If it's slower, it feels sluggish.

---

## Recipe 2: Focus Ring (45 seconds)

[SHOW: Focus Ring recipe card]

> This one's about accessibility. Watch what happens when I click this button with my mouse.
>
> [CLICK the Standard button with mouse]
>
> No ring. But now let me Tab to it with my keyboard.
>
> [Press TAB to focus the button]
>
> *Now* you see the ring. This is the difference between `:focus` and `:focus-visible`.
>
> The old `:focus` selector shows the ring on every focus — even mouse clicks. Users hated those random blue outlines appearing everywhere. So browsers introduced `:focus-visible`, which only shows the ring when it's actually helpful — like keyboard navigation.
>
> [TAB through all the elements]
>
> For keyboard users, these rings are essential. They need to know where they are on the page. So we make them visible, high-contrast, and we even animate them in smoothly.

---

## Recipe 3: Toast Notifications (1 minute)

[SHOW: Toast recipe card]

> Toasts are those little notification popups. Let me trigger one.
>
> [CLICK "Show Toast"]
>
> See how it slides up and fades in? And after 3 seconds, it slides up and fades out.
>
> [CLICK a few more times to stack them]
>
> The animation is just two CSS properties: `translateY` for the slide, and `opacity` for the fade. That's it.
>
> [SHOW: Implementation notes]
>
> One important thing — see this `role="status"` and `aria-live="polite"`? That's for screen readers. When a toast appears, the screen reader will announce it to blind users, but "politely" — meaning it waits until the user isn't in the middle of something.
>
> [TURN ON reduced motion, then click "Show Toast"]
>
> And with reduced motion on? The toast just appears and disappears instantly. No slide. Still functional, just not animated.

---

## Recipe 4: Skeleton Shimmer (45 seconds)

[SHOW: Skeleton Shimmer recipe card]

> You've seen these loading skeletons on every modern website. They show the shape of content before it loads.
>
> [POINT to the shimmer effect]
>
> That shimmer moving across? It's just a pseudo-element — a `::before` — that slides from left to right using `translateX`. One element, one animation, infinitely looping.
>
> The trick is keeping it subtle. The gradient goes from gray to slightly-lighter-gray and back. If the contrast is too high, it becomes distracting. If the animation is too fast, it feels frantic.
>
> [TURN ON reduced motion]
>
> With reduced motion? Just a static gray. Still clearly a loading state, but no movement.

---

## Recipe 5: Accordion (1 minute)

[SHOW: Accordion recipe card]

> Accordions are interesting because you need to animate *height* — and I just told you not to animate height. So how do we do it?
>
> [CLICK to expand/collapse accordion items]
>
> This uses a clever CSS Grid trick. Instead of animating `height` directly, we animate `grid-template-rows` from `0fr` to `1fr`.
>
> [SHOW: Implementation notes]
>
> `1fr` means "one fraction of available space" — which equals the content's natural height. CSS can interpolate between `0fr` and `1fr` smoothly. The content has `overflow: hidden` so it clips as it collapses.
>
> The old way? You'd have to measure the content height with JavaScript, set an explicit pixel height, animate to it, then remove the height. It was messy and caused layout thrashing. This CSS-only approach is cleaner and faster.
>
> [POINT to the chevron]
>
> Also notice the chevron rotates. Small detail, but it gives clear feedback about what's open and closed.

---

## Recipe 6: Drawer (1 minute 15 seconds)

[SHOW: Drawer recipe card]

> Drawers are panels that slide in from the side. Let me open this one.
>
> [CLICK "Open Drawer"]
>
> Slides in from the right. The background dims with a semi-transparent overlay. Pretty standard stuff.
>
> But here's where accessibility gets serious. Try tabbing around.
>
> [TAB through the drawer elements]
>
> Notice how your focus stays *inside* the drawer? You can't Tab out to the page behind it. This is called a **focus trap**. When a modal or drawer is open, keyboard users shouldn't accidentally end up behind it.
>
> [PRESS ESC]
>
> ESC closes it. That's expected behavior that users rely on.
>
> [OPEN drawer again, notice where focus goes]
>
> When it opens, focus moves to the close button. When it closes, focus returns to the button that opened it. This is focus *management* — making sure keyboard users never get lost.
>
> [SHOW: Implementation notes]
>
> The animation itself is just `translateX`. Starts at 100% (off-screen right), animates to 0 (visible). The overlay fades from opacity 0 to 0.5.

---

## Recipe 7: Tooltip (45 seconds)

[SHOW: Tooltip recipe card]

> Tooltips seem simple, but there are subtle details.
>
> [HOVER over "Top" button — wait for tooltip]
>
> See that slight delay? About 150 milliseconds. That's intentional. If tooltips appeared instantly, they'd flash constantly as you move your mouse across the UI. The delay filters out accidental hovers.
>
> [MOVE mouse away — tooltip disappears immediately]
>
> But when you move *away*, it disappears instantly. No delay. A lingering tooltip feels broken.
>
> [TAB to focus a button]
>
> And importantly — keyboard users can see tooltips too. When I Tab to a button, the tooltip appears. That's the `group-focus-within` selector in Tailwind.
>
> [SHOW: aria-describedby in notes]
>
> For screen readers, `aria-describedby` links the button to the tooltip text, so blind users hear the extra information.

---

## Recipe 8: Tabs Indicator (45 seconds)

[SHOW: Tabs Indicator recipe card]

> Tab components often have this sliding underline indicator. Watch it follow the active tab.
>
> [CLICK through different tabs]
>
> Smooth, right? This isn't animating `left` though — that would cause layout recalculations.
>
> [SHOW: Implementation notes]
>
> We measure each tab's `offsetLeft` and `offsetWidth` in JavaScript, then set those as inline styles on the indicator. CSS transitions handle the smooth movement via `transform`.
>
> So the JavaScript just says "the indicator should be *here* now." CSS handles the interpolation to get there smoothly.

---

## Recipe 9: List Reorder (45 seconds)

[SHOW: List Reorder recipe card]

> Reordering lists with animation usually requires a library. This is a simpler version.
>
> [CLICK the up/down arrows to move items]
>
> When items swap positions, they animate smoothly.
>
> [CLICK "Shuffle"]
>
> Even a full shuffle animates.
>
> This doesn't use the full FLIP technique — that's where you measure positions before and after, then animate the difference. For simple cases like this, React re-renders the list, the DOM order changes, and CSS transitions handle the visual movement.
>
> [TURN ON reduced motion, then Shuffle]
>
> With reduced motion, items just swap instantly. Still works, no animation.

---

## Recipe 10: Success Check (45 seconds)

[SHOW: Success Check recipe card]

> Finally, a fun one — the success checkmark animation.
>
> [CLICK "Trigger Success"]
>
> The circle scales in, then the checkmark *draws* itself. That drawing effect is a classic SVG trick.
>
> [SHOW: Implementation notes]
>
> The checkmark path has a `stroke-dasharray` equal to its total length — let's say 24 pixels. We set `stroke-dashoffset` to 24, which hides the entire stroke. Then we animate the offset to 0, which reveals it progressively. It looks like it's being drawn.
>
> [CLICK "Trigger Success" again]
>
> Circle scales in first with a slight delay, then the check draws. Sequencing animations with delays creates that polished feel.

---

## Wrap-up (45 seconds)

[SHOW: Scroll back to the top of the page]

> So that's Motion Recipes — 10 patterns you can copy into your own projects.
>
> The big takeaways:
>
> **One**: CSS can do most of this. You don't need animation libraries for subtle interactions.
>
> **Two**: Only animate `transform` and `opacity`. Everything else triggers layout and hurts performance.
>
> **Three**: Respect reduced motion. Always. It's not optional.
>
> **Four**: Accessibility isn't just screen readers — it's focus management, keyboard navigation, and clear visual feedback.
>
> [SHOW: GitHub link in footer]
>
> The code is all on GitHub — link's in the footer. Feel free to grab whatever's useful for your projects.
>
> Thanks for watching!

---

## Recording Tips

- Pause briefly after each action so viewers can see the effect
- Move your cursor smoothly and deliberately
- When explaining code concepts, slow down slightly
- Let the animations complete before moving on
